import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CONFIG } from '../../../../dictionary/config';
import { COLOR_DICTIONARY } from '../../../../dictionary/color-dictionary';
import { ILine, ILineSegment, LineSegmentType } from '../../../../models/interfaces/types';
import { flattenLineSegments } from '../../../../models/interfaces/line-segment.utils';

type LatLng = { lat: number; lng: number };

@Component({
  standalone: false,
  selector: 'app-line-map-3d',
  templateUrl: './line-map-3d.component.html',
})
export class LineMap3dComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() line: ILine;
  @ViewChild('map3dRef') map3dRef?: ElementRef<HTMLElement>;

  public apiReady = false;
  public mapUnavailable = false;
  private maps3dLib: any;
  private polyline3dElements: any[] = [];
  private isViewReady = false;
  private isDestroyed = false;
  private readonly scriptId = 'google-maps-js-api';
  private lastPathKey = '';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cdRef: ChangeDetectorRef,
    private readonly zone: NgZone,
    private readonly colorDictionary: COLOR_DICTIONARY
  ) {}

  public ngOnInit(): void {
    this.ensureGoogleMapsApiLoaded();
  }

  public ngAfterViewInit(): void {
    this.isViewReady = true;
    this.init3dMapIfReady();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['line']) {
      this.renderLineOnMap();
    }
  }

  public ngOnDestroy(): void {
    const map3d = this.getMapElement();
    for (const polyline of this.polyline3dElements) {
      if (map3d && typeof map3d.removeChild === 'function' && map3d.contains(polyline)) {
        map3d.removeChild(polyline);
      }
    }
    this.polyline3dElements = [];
    this.isDestroyed = true;
  }

  private ensureGoogleMapsApiLoaded(): void {
    const globalScope = globalThis as any;
    if ((globalThis as any)?.google?.maps?.importLibrary) {
      this.markApiReady();
      return;
    }
    this.ensureImportLibrarySupport();

    if (globalScope.__freeraidaGoogleMapsLoadPromise) {
      globalScope.__freeraidaGoogleMapsLoadPromise
        .then(() => this.markApiReady())
        .catch(() => {
          this.zone.run(() => {
            this.mapUnavailable = true;
            this.cdRef.detectChanges();
          });
        });
      return;
    }

    const existingScript = this.document.getElementById(this.scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      if ((globalThis as any)?.google?.maps) {
        this.markApiReady();
        return;
      }
      globalScope.__freeraidaGoogleMapsLoadPromise = new Promise<void>((resolve, reject) => {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(), { once: true });
      });
      globalScope.__freeraidaGoogleMapsLoadPromise
        .then(() => this.markApiReady())
        .catch(() => {
          this.zone.run(() => {
            this.mapUnavailable = true;
            this.cdRef.detectChanges();
          });
        });
      return;
    }

    const apiKey = CONFIG.getGoogleMapsKey();
    const queryParts: string[] = [];
    if (apiKey) {
      queryParts.push('key=' + encodeURIComponent(apiKey));
    }
    queryParts.push('v=beta');
    queryParts.push('loading=async');
    queryParts.push('libraries=maps3d');
    const query = queryParts.length > 0 ? '?' + queryParts.join('&') : '';

    const script = this.document.createElement('script');
    script.id = this.scriptId;
    script.src = 'https://maps.googleapis.com/maps/api/js' + query;
    script.async = true;
    script.defer = true;
    globalScope.__freeraidaGoogleMapsLoadPromise = new Promise<void>((resolve, reject) => {
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener('error', () => reject(), { once: true });
    });
    globalScope.__freeraidaGoogleMapsLoadPromise
      .then(() => this.markApiReady())
      .catch(() => {
        this.zone.run(() => {
          this.mapUnavailable = true;
          this.cdRef.detectChanges();
        });
      });
    this.document.head.appendChild(script);
  }

  private markApiReady(): void {
    this.ensureImportLibrarySupport();
    const mapsApi = (globalThis as any)?.google?.maps;
    const hasMaps3d = !!mapsApi?.maps3d?.Polyline3DElement;
    const hasImportLibrary = typeof mapsApi?.importLibrary === 'function';
    if (!hasMaps3d && !hasImportLibrary) {
      this.zone.run(() => {
        this.mapUnavailable = true;
        this.apiReady = false;
        this.cdRef.detectChanges();
      });
      return;
    }
    this.zone.run(() => {
      this.apiReady = true;
      this.cdRef.detectChanges();
      this.init3dMapIfReady();
    });
  }

  private async init3dMapIfReady(): Promise<void> {
    if (!this.apiReady || !this.isViewReady || !this.map3dRef || this.isDestroyed || this.maps3dLib) {
      return;
    }

    try {
      this.maps3dLib = await this.resolveMaps3dLibrary();
      const map3d = this.getMapElement();
      if (map3d) {
        map3d.mode = 'SATELLITE';
        map3d.gestureHandling = 'COOPERATIVE';
      }
      this.renderLineOnMap();
    } catch {
      this.zone.run(() => {
        this.mapUnavailable = true;
        this.cdRef.detectChanges();
      });
    }
  }

  private renderLineOnMap(): void {
    if (!this.maps3dLib || !this.line || !Array.isArray(this.line.segments)) {
      return;
    }

    const flattenedPath = flattenLineSegments(this.line)
      .map((loc) => ({ lat: Number(loc.latitude), lng: Number(loc.longitude) }))
      .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
    const pathKey = this.getSegmentsKey(this.line.segments);

    const map3d = this.getMapElement();
    if (!map3d) {
      return;
    }

    if (flattenedPath.length === 0) {
      for (const polyline of this.polyline3dElements) {
        if (typeof map3d.removeChild === 'function' && map3d.contains(polyline)) {
          map3d.removeChild(polyline);
        }
      }
      this.polyline3dElements = [];
      this.lastPathKey = '';
      return;
    }

    if (pathKey === this.lastPathKey) {
      return;
    }

    for (const polyline of this.polyline3dElements) {
      if (typeof map3d.removeChild === 'function' && map3d.contains(polyline)) {
        map3d.removeChild(polyline);
      }
    }
    this.polyline3dElements = [];

    const { Polyline3DElement, AltitudeMode } = this.maps3dLib;
    const altitudeMode =
      AltitudeMode && typeof AltitudeMode.RELATIVE_TO_GROUND !== 'undefined'
        ? AltitudeMode.RELATIVE_TO_GROUND
        : undefined;
    this.polyline3dElements = this.line.segments
      .flatMap((segment: ILineSegment) => {
        const path = (segment.locations || [])
          .map((loc) => ({ lat: Number(loc.latitude), lng: Number(loc.longitude) }))
          .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
        const drawPaths = this.get3dDrawPaths(path, segment.type);
        return drawPaths.map((drawPath) => {
          const polyline = new Polyline3DElement({
            path: drawPath,
            strokeColor: this.colorDictionary.getSegmentColor(segment.type) || '#404040',
            //outerColor: '#ffffff',
            strokeWidth: 2,
            outerWidth: 0.2,
            ...(altitudeMode ? { altitudeMode } : {}),
            drawsOccludedSegments: false,
          });
          map3d.append(polyline);
          return polyline;
        });
      })
      .filter((polyline) => !!polyline);
    this.lastPathKey = pathKey;

    this.fitLineInView(flattenedPath);
  }

  private fitLineInView(path: LatLng[]): void {
    const map3d = this.getMapElement();
    if (!map3d) {
      return;
    }

    const bounds = this.getBounds(path);
    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;
    const range = this.estimateRangeMeters(bounds, centerLat);
    const heading = this.getPathHeading(path);

    const camera = {
      center: {
        lat: centerLat,
        lng: centerLng,
        altitude: 120,
      },
      range,
      tilt: 58,
      heading,
    };

    if (typeof map3d.flyCameraTo === 'function') {
      map3d.flyCameraTo({
        endCamera: camera,
        durationMillis: 1200,
      });
      return;
    }

    map3d.center = camera.center;
    map3d.range = camera.range;
    map3d.tilt = camera.tilt;
    map3d.heading = camera.heading;
  }

  private getBounds(path: LatLng[]): { north: number; south: number; east: number; west: number } {
    let north = path[0].lat;
    let south = path[0].lat;
    let east = path[0].lng;
    let west = path[0].lng;

    for (const point of path) {
      north = Math.max(north, point.lat);
      south = Math.min(south, point.lat);
      east = Math.max(east, point.lng);
      west = Math.min(west, point.lng);
    }

    return { north, south, east, west };
  }

  private estimateRangeMeters(
    bounds: { north: number; south: number; east: number; west: number },
    latitude: number
  ): number {
    const latSpan = Math.abs(bounds.north - bounds.south);
    const lngSpan = Math.abs(bounds.east - bounds.west);
    const latMeters = latSpan * 111320;
    const lngMeters = lngSpan * 111320 * Math.cos((latitude * Math.PI) / 180);
    const maxSpanMeters = Math.max(latMeters, lngMeters);
    return Math.max(1300, Math.min(30000, maxSpanMeters * 3 + 700));
  }

  private getMapElement(): any | null {
    return this.map3dRef?.nativeElement ?? null;
  }

  private getPathKey(path: LatLng[]): string {
    return path.map((point) => point.lat.toFixed(6) + ':' + point.lng.toFixed(6)).join('|');
  }

  private getSegmentsKey(segments: ILineSegment[]): string {
    if (!Array.isArray(segments)) {
      return '';
    }
    return segments
      .map(
        (segment) =>
          `${segment.type}:${this.getPathKey(
            (segment.locations || []).map((loc) => ({ lat: loc.latitude, lng: loc.longitude }))
          )}`
      )
      .join('||');
  }

  private getPathHeading(path: LatLng[]): number {
    if (path.length < 2) {
      return 0;
    }

    const start = path[0];
    const end = path[path.length - 1];
    if (start.lat === end.lat && start.lng === end.lng) {
      return 0;
    }

    const startLat = this.degr2rad(start.lat);
    const endLat = this.degr2rad(end.lat);
    const deltaLng = this.degr2rad(end.lng - start.lng);
    const y = Math.sin(deltaLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLng);
    const bearingDeg = this.rad2degr(Math.atan2(y, x));

    return (bearingDeg + 360) % 360;
  }

  private rad2degr(rad: number): number {
    return (rad * 180) / Math.PI;
  }

  private degr2rad(degr: number): number {
    return (degr * Math.PI) / 180;
  }

  private async resolveMaps3dLibrary(): Promise<any> {
    const mapsApi = (globalThis as any)?.google?.maps;
    if (!mapsApi) {
      throw new Error('Google Maps API unavailable');
    }

    if (mapsApi.maps3d?.Polyline3DElement) {
      return mapsApi.maps3d;
    }

    const importLibrary = mapsApi.importLibrary;
    if (typeof importLibrary === 'function') {
      const imported = await importLibrary.call(mapsApi, 'maps3d');
      if (imported?.Polyline3DElement) {
        return imported;
      }
    }

    throw new Error('Maps 3D library unavailable');
  }

  private ensureImportLibrarySupport(): void {
    const mapsApi = (globalThis as any)?.google?.maps;
    if (!mapsApi || typeof mapsApi.importLibrary === 'function') {
      return;
    }
    mapsApi.importLibrary = async (library: string) => {
      const timeoutMs = 5000;
      const startedAt = Date.now();
      while (Date.now() - startedAt < timeoutMs) {
        if (library === 'maps' && typeof mapsApi.Map === 'function' && typeof mapsApi.Polyline === 'function') {
          return mapsApi;
        }
        if (library === 'maps3d' && mapsApi.maps3d) {
          return mapsApi.maps3d;
        }
        if (library === 'marker' && (mapsApi as any).marker) {
          return (mapsApi as any).marker;
        }
        await new Promise((resolve) => setTimeout(resolve, 20));
      }

      if (library === 'maps') {
        throw new Error('Maps library unavailable');
      }
      return mapsApi;
    };
  }

  private get3dDrawPaths(path: LatLng[], segmentType: string): LatLng[][] {
    if (path.length < 2) {
      return [];
    }
    if (!this.isAscendSegmentType(segmentType)) {
      return [path];
    }
    const interpolated = this.interpolatePathForDots(path, 15);
    const dottedPaths: LatLng[][] = [];
    for (let i = 0; i < interpolated.length - 1; i += 2) {
      dottedPaths.push([interpolated[i], interpolated[i + 1]]);
    }
    return dottedPaths.length > 0 ? dottedPaths : [path];
  }

  private interpolatePathForDots(path: LatLng[], targetSpacingMeters: number): LatLng[] {
    if (path.length < 2) {
      return path;
    }
    const result: LatLng[] = [path[0]];
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      const segmentDistance = this.haversineDistance(start, end);
      const numPoints = Math.max(1, Math.floor(segmentDistance / targetSpacingMeters));
      for (let j = 1; j <= numPoints; j++) {
        const t = j / numPoints;
        result.push({
          lat: start.lat + (end.lat - start.lat) * t,
          lng: start.lng + (end.lng - start.lng) * t,
        });
      }
    }
    return result;
  }

  private haversineDistance(a: LatLng, b: LatLng): number {
    const R = 6371000;
    const lat1 = this.degr2rad(a.lat);
    const lat2 = this.degr2rad(b.lat);
    const dLat = lat2 - lat1;
    const dLng = this.degr2rad(b.lng - a.lng);
    const sinHalfLat = Math.sin(dLat / 2);
    const sinHalfLng = Math.sin(dLng / 2);
    const h = sinHalfLat * sinHalfLat + Math.cos(lat1) * Math.cos(lat2) * sinHalfLng * sinHalfLng;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  private isAscendSegmentType(segmentType: string): boolean {
    const normalized = segmentType as LineSegmentType;
    return normalized === 'SKINNING' || normalized === 'BOOT_SECTION';
  }
}
