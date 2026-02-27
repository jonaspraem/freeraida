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
import { ILine, ILineSegment } from '../../../../models/interfaces/types';
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
      .map((segment: ILineSegment) => {
        const path = (segment.locations || [])
          .map((loc) => ({ lat: Number(loc.latitude), lng: Number(loc.longitude) }))
          .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
        if (path.length < 2) {
          return null;
        }
        const polyline = new Polyline3DElement({
          path,
          strokeColor: this.colorDictionary.getSegmentColor(segment.type) || '#404040',
          outerColor: '#ffffff',
          strokeWidth: 6,
          outerWidth: 0.35,
          ...(altitudeMode ? { altitudeMode } : {}),
          drawsOccludedSegments: false,
        });
        map3d.append(polyline);
        return polyline;
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

    if (typeof mapsApi.importLibrary === 'function') {
      return mapsApi.importLibrary('maps3d');
    }

    throw new Error('Maps 3D library unavailable');
  }
}
