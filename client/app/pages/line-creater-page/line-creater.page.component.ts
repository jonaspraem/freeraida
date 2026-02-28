import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ILine,
  ILineLocation,
  ILineSegment,
  IPolylineCoordinates,
  LineSegmentType,
} from '../../models/interfaces/types';
import { LineService } from '../../core/services/line.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CONFIG } from '../../dictionary/config';
import { COLOR_DICTIONARY } from '../../dictionary/color-dictionary';
import { flattenLineSegments, segmentTypeToLabel } from '../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-line-creator',
  templateUrl: './line-creator.page.component.html',
})
export class LineCreatorPageComponent implements OnInit, OnDestroy {
  @ViewChild('map3dRef') map3dRef?: ElementRef<HTMLElement>;
  public segments: ILineSegment[] = [];
  public line: ILineLocation[] = [];
  public polyCords: IPolylineCoordinates[];
  public apiReady = false;
  public mapUnavailable = false;
  public center = { lat: 45.407043524444866, lng: 7.031422227962352 };
  public polylinePath: { lat: number; lng: number }[] = [];
  public registerForm = new FormGroup({
    lineName: new FormControl('', Validators.required),
    lineSport: new FormControl('', Validators.required),
  });

  /**
   * Make enum
   * rework
   */
  public sportsTypes = ['Skiing', 'Snowboarding'];
  public segmentTypeOptions: { value: LineSegmentType; label: string }[] = [
    { value: 'FREERIDE', label: 'Freeride' },
    { value: 'SKINNING', label: 'Skinning' },
    { value: 'BOOT_SECTION', label: 'Boot section' },
  ];
  public activeSegmentType: LineSegmentType = 'FREERIDE';
  private readonly markerDotColor = '#141d2f';
  private readonly defaultDiscipline = 'Segmented';

  public readonly elevationMismatchThresholdMeters = 2;
  private maps3dLib: any;
  private polyline3dElements: any[] = [];
  private marker3dElements: any[] = [];
  private isDestroyed = false;
  private isViewReady = false;
  private segmentTransitionStart?: ILineLocation;
  private readonly scriptId = 'google-maps-js-api';
  private readonly onMapClickListener = (event: any) => this.onMap3dClicked(event);

  constructor(
    private _lineService: LineService,
    private _cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly zone: NgZone,
    public readonly colorDictionary: COLOR_DICTIONARY
  ) {}

  public ngOnInit(): void {
    this.ensureGoogleMapsApiLoaded();
  }

  public ngAfterViewInit(): void {
    this.isViewReady = true;
    this.initialize3dMapIfReady();
  }

  public ngOnDestroy(): void {
    this.isDestroyed = true;
    const map3d = this.getMapElement();
    if (map3d) {
      map3d.removeEventListener('gmp-click', this.onMapClickListener as EventListener);
    }
    this.clear3dOverlays();
  }

  private onMap3dClicked(event: any): void {
    const coords = this.extractClickedPosition(event);
    if (!coords) {
      return;
    }

    const previousLocation = this.line.length > 0 ? this.line[this.line.length - 1] : null;
    const previousDistance = Number(previousLocation?.distanceFromStart || 0);
    const segmentDistance = previousLocation
      ? this.getDistanceKm(previousLocation.latitude, previousLocation.longitude, coords.lat, coords.lng)
      : 0;
    const location: ILineLocation = {
      latitude: coords.lat,
      longitude: coords.lng,
      elevation: Number.isFinite(coords.altitude) ? coords.altitude : undefined,
      distanceFromStart: previousDistance + segmentDistance,
    };
    const newSegments = [...this.segments];
    const activeSegment = newSegments[newSegments.length - 1];
    if (!activeSegment || activeSegment.type !== this.activeSegmentType) {
      const transitionStart = this.segmentTransitionStart ? this.cloneLocation(this.segmentTransitionStart) : null;
      newSegments.push({
        type: this.activeSegmentType,
        locations: transitionStart ? [transitionStart, location] : [location],
      });
      this.segmentTransitionStart = undefined;
    } else {
      activeSegment.locations = [...activeSegment.locations, location];
      newSegments[newSegments.length - 1] = activeSegment;
    }
    this.segments = newSegments;
    this.syncLineFromSegments();
    this.zone.run(() => {
      this._cdRef.detectChanges();
    });
    this.updateLine();
  }

  public updateLine() {
    const currentLine = [...this.line];
    this._lineService.getLineInfo(currentLine).subscribe((data) => {
      const apiLine: ILineLocation[] = Array.isArray(data?.obj) ? data.obj : [];
      const enrichedFlatLine = apiLine.map((apiLoc, index) => {
        const localLoc = currentLine[index] as any;
        const apiElevation = Number(apiLoc?.elevation);
        const localMapElevation = Number(localLoc?.elevation);
        return {
          ...apiLoc,
          // Keep map-provided altitude in elevation.
          elevation: Number.isFinite(localMapElevation) ? localMapElevation : apiLoc?.elevation,
          // Persist backend elevation under elevationAPI for UI comparison.
          elevationAPI: Number.isFinite(apiElevation) ? apiElevation : undefined,
        } as ILineLocation;
      });
      this.applyFlatLineToSegments(enrichedFlatLine);
      this.syncLineFromSegments();
      this.updatePolylinePath();
      this.renderLine3d();
    });
    this.updatePolyCords();
  }

  updatePolyCords() {
    const cords: IPolylineCoordinates[] = [];
    let prev_lat;
    let prev_lng;
    for (const loc of this.line) {
      if (prev_lat && prev_lng)
        cords.push({
          org_lat: prev_lat,
          org_lng: prev_lng,
          destination_lat: loc.latitude,
          destination_lng: loc.longitude,
        });
      prev_lat = loc.latitude;
      prev_lng = loc.longitude;
    }
    this.polyCords = cords;
    this.updatePolylinePath();
  }

  public onClear(): void {
    this.segments = [];
    this.line = [];
    this.polyCords = [];
    this.polylinePath = [];
    this.registerForm.reset();
    this.segmentTransitionStart = undefined;
    this.clear3dOverlays();
  }

  public onSubmit(): void {
    const line: ILine = {
      name: this.registerForm.controls.lineName.value,
      sport: this.registerForm.controls.lineSport.value,
      discipline: this.defaultDiscipline,
      segments: this.segments,
    };
    this._lineService.saveLine(line).subscribe(() => {
      this.onClear();
    });
  }

  public onSegmentTypeChange(segmentType: string): void {
    const nextSegmentType = segmentType as LineSegmentType;
    if (!nextSegmentType || nextSegmentType === this.activeSegmentType) {
      return;
    }
    if (this.line.length > 0) {
      this.segmentTransitionStart = this.cloneLocation(this.line[this.line.length - 1]);
    }
    this.activeSegmentType = nextSegmentType;
  }

  public onUndoLastPoint(): void {
    if (this.line.length === 0 || this.segments.length === 0) {
      return;
    }

    const nextSegments: ILineSegment[] = this.segments.map((segment) => ({
      ...segment,
      locations: [...(segment.locations || [])],
    }));
    const lastSegment = nextSegments[nextSegments.length - 1];
    lastSegment.locations.pop();

    while (nextSegments.length > 0 && nextSegments[nextSegments.length - 1].locations.length === 0) {
      nextSegments.pop();
    }

    if (nextSegments.length > 1) {
      const tailSegment = nextSegments[nextSegments.length - 1];
      const previousSegment = nextSegments[nextSegments.length - 2];
      const tailOnlyPoint = tailSegment.locations[0];
      const previousLastPoint = previousSegment.locations[previousSegment.locations.length - 1];
      if (tailSegment.locations.length === 1 && this.isSameCoordinate(tailOnlyPoint, previousLastPoint)) {
        nextSegments.pop();
      }
    }

    this.segments = nextSegments;
    this.segmentTransitionStart = undefined;
    this.syncLineFromSegments();
    this.updatePolyCords();
    this.renderLine3d();
    this._cdRef.detectChanges();
  }

  public getSegmentLabel(segmentType: LineSegmentType): string {
    return segmentTypeToLabel(segmentType);
  }

  public getSegmentColor(segmentType: LineSegmentType): string {
    return this.colorDictionary.getSegmentColor(segmentType) || '#404040';
  }

  private updatePolylinePath(): void {
    this.polylinePath = this.line.map((loc) => ({
      lat: loc.latitude,
      lng: loc.longitude,
    }));
  }

  private ensureGoogleMapsApiLoaded(): void {
    const globalScope = globalThis as any;
    if ((globalScope as any)?.google?.maps) {
      this.ensureImportLibrarySupport();
      this.mark3dApiReadyIfSupported();
      return;
    }

    if (globalScope.__freeraidaGoogleMapsLoadPromise) {
      globalScope.__freeraidaGoogleMapsLoadPromise
        .then(() => {
          this.zone.run(() => {
            this.mark3dApiReadyIfSupported();
          });
        })
        .catch(() => {
          this.zone.run(() => {
            this.mapUnavailable = true;
            this._cdRef.detectChanges();
          });
        });
      return;
    }

    const existingScript = this.document.getElementById(this.scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      if ((globalThis as any)?.google?.maps) {
        this.mark3dApiReadyIfSupported();
        return;
      }
      globalScope.__freeraidaGoogleMapsLoadPromise = new Promise<void>((resolve, reject) => {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(), { once: true });
      });
      globalScope.__freeraidaGoogleMapsLoadPromise
        .then(() => {
          this.zone.run(() => {
            this.mark3dApiReadyIfSupported();
          });
        })
        .catch(() => {
          this.zone.run(() => {
            this.mapUnavailable = true;
            this._cdRef.detectChanges();
          });
        });
      return;
    }

    const script = this.document.createElement('script');
    const apiKey = CONFIG.getGoogleMapsKey();
    const queryParts: string[] = [];
    if (apiKey) {
      queryParts.push('key=' + encodeURIComponent(apiKey));
    }
    queryParts.push('v=beta');
    queryParts.push('loading=async');
    queryParts.push('libraries=maps3d');
    const query = queryParts.length > 0 ? '?' + queryParts.join('&') : '';
    script.id = this.scriptId;
    script.src = 'https://maps.googleapis.com/maps/api/js' + query;
    script.async = true;
    script.defer = true;
    globalScope.__freeraidaGoogleMapsLoadPromise = new Promise<void>((resolve, reject) => {
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener('error', () => reject(), { once: true });
    });
    globalScope.__freeraidaGoogleMapsLoadPromise
      .then(() => {
        this.zone.run(() => {
          this.mark3dApiReadyIfSupported();
        });
      })
      .catch(() => {
        this.zone.run(() => {
          this.mapUnavailable = true;
          this._cdRef.detectChanges();
        });
      });
    this.document.head.appendChild(script);
  }

  private mark3dApiReadyIfSupported(): void {
    this.ensureImportLibrarySupport();
    const mapsApi = (globalThis as any)?.google?.maps;
    const hasMaps3d = !!mapsApi?.maps3d?.Map3DElement;
    const hasImportLibrary = typeof mapsApi?.importLibrary === 'function';
    if (!hasMaps3d && !hasImportLibrary) {
      this.apiReady = false;
      this.mapUnavailable = true;
      this._cdRef.detectChanges();
      return;
    }
    this.apiReady = true;
    this.mapUnavailable = false;
    this._cdRef.detectChanges();
    this.initialize3dMapIfReady();
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

  private async initialize3dMapIfReady(): Promise<void> {
    if (!this.apiReady || !this.isViewReady || !this.map3dRef || this.isDestroyed || this.maps3dLib) {
      return;
    }

    try {
      this.maps3dLib = await this.resolveMaps3dLibrary();
      const map3d = this.getMapElement();
      if (!map3d) {
        return;
      }

      map3d.mode = 'SATELLITE';
      map3d.gestureHandling = 'GREEDY';
      map3d.center = { lat: this.center.lat, lng: this.center.lng, altitude: 120 };
      map3d.range = 8643;
      map3d.tilt = 55;
      map3d.heading = 0;
      map3d.defaultUIDisabled = false;
      map3d.defaultUIHidden = false;
      map3d.zoom = 16;
      map3d.addEventListener('gmp-click', this.onMapClickListener as EventListener);

      this.renderLine3d();
    } catch {
      this.zone.run(() => {
        this.mapUnavailable = true;
        this._cdRef.detectChanges();
      });
    }
  }

  private renderLine3d(): void {
    if (!this.maps3dLib) {
      return;
    }

    const map3d = this.getMapElement();
    if (!map3d) {
      return;
    }

    this.clear3dOverlays();
    if (!Array.isArray(this.segments) || this.segments.length === 0) {
      return;
    }

    const { Polyline3DElement, MarkerElement, AltitudeMode } = this.maps3dLib;
    const altitudeMode =
      AltitudeMode && typeof AltitudeMode.RELATIVE_TO_GROUND !== 'undefined'
        ? AltitudeMode.RELATIVE_TO_GROUND
        : undefined;
    this.polyline3dElements = this.segments
      .flatMap((segment) => {
        const path = (segment.locations || [])
          .map((loc) => ({ lat: Number(loc.latitude), lng: Number(loc.longitude) }))
          .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
        const drawPaths = this.get3dDrawPaths(path, segment.type);
        return drawPaths.map((drawPath) => {
          const polyline = new Polyline3DElement({
            path: drawPath,
            strokeColor: this.getSegmentColor(segment.type),
            outerColor: '#ffffff',
            strokeWidth: 6,
            outerWidth: 0.35,
            ...(altitudeMode ? { altitudeMode } : {}),
            drawsOccludedSegments: false,
          });
          map3d.append(polyline);
          return polyline;
        });
      })
      .filter((polyline) => !!polyline);

    const markerPath = this.line
      .map((loc) => ({ lat: Number(loc.latitude), lng: Number(loc.longitude) }))
      .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));

    this.marker3dElements = markerPath.map((point) => {
      const marker = new MarkerElement({
        position: point,
        ...(altitudeMode ? { altitudeMode } : {}),
      });
      marker.innerHTML =
        '<span style="display:block;width:8px;height:8px;border-radius:50%;background:' +
        this.markerDotColor +
        ';border:2px solid #ffffff;box-shadow:0 0 0 1px rgba(0,0,0,0.18);"></span>';
      map3d.append(marker);
      return marker;
    });
  }

  private clear3dOverlays(): void {
    const map3d = this.getMapElement();
    if (!map3d) {
      return;
    }

    for (const polyline of this.polyline3dElements) {
      if (map3d.contains(polyline)) {
        map3d.removeChild(polyline);
      }
    }
    this.polyline3dElements = [];

    for (const marker of this.marker3dElements) {
      if (map3d.contains(marker)) {
        map3d.removeChild(marker);
      }
    }
    this.marker3dElements = [];
  }

  public formatDistance(distance?: number): string {
    if (!Number.isFinite(distance)) {
      return '-';
    }
    return Number(distance).toFixed(2) + ' km';
  }

  public formatElevation(elevation?: number): string {
    if (!Number.isFinite(elevation)) {
      return '-';
    }
    return Math.round(Number(elevation)) + ' m';
  }

  public formatApiElevation(location: ILineLocation): string {
    const value = Number((location as any)?.elevationAPI);
    if (!Number.isFinite(value)) {
      return '-';
    }
    return Math.round(value) + ' m';
  }

  public getElevationDiff(location: ILineLocation): number | null {
    const mapElevation = Number(location?.elevation);
    const apiElevation = Number((location as any)?.elevationAPI);
    if (!Number.isFinite(mapElevation) || !Number.isFinite(apiElevation)) {
      return null;
    }
    return Math.abs(mapElevation - apiElevation);
  }

  public hasElevationMismatch(location: ILineLocation): boolean {
    const diff = this.getElevationDiff(location);
    return diff != null && diff > this.elevationMismatchThresholdMeters;
  }

  private syncLineFromSegments(): void {
    this.line = flattenLineSegments({ segments: this.segments } as ILine);
  }

  private applyFlatLineToSegments(flatLocations: ILineLocation[]): void {
    let pointer = 0;
    this.segments = this.segments.map((segment) => {
      const locationCount = Array.isArray(segment.locations) ? segment.locations.length : 0;
      const nextLocations = flatLocations.slice(pointer, pointer + locationCount);
      pointer += locationCount;
      return {
        ...segment,
        locations: nextLocations,
      };
    });
  }

  private cloneLocation(location: ILineLocation): ILineLocation {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      elevation: location.elevation,
      distanceFromStart: location.distanceFromStart,
      distanceFromLast: location.distanceFromLast,
      timeFromStart: location.timeFromStart,
      timeFromLast: location.timeFromLast,
      images: location.images,
      lineIndex: location.lineIndex,
    };
  }

  private isSameCoordinate(a?: ILineLocation, b?: ILineLocation): boolean {
    if (!a || !b) {
      return false;
    }
    return Number(a.latitude) === Number(b.latitude) && Number(a.longitude) === Number(b.longitude);
  }

  private get3dDrawPaths(
    path: Array<{ lat: number; lng: number }>,
    segmentType: string
  ): Array<Array<{ lat: number; lng: number }>> {
    if (path.length < 2) {
      return [];
    }
    if (!this.isAscendSegmentType(segmentType)) {
      return [path];
    }
    const interpolated = this.interpolatePathForDots(path, 15);
    const dottedPaths: Array<Array<{ lat: number; lng: number }>> = [];
    for (let i = 0; i < interpolated.length - 1; i += 2) {
      dottedPaths.push([interpolated[i], interpolated[i + 1]]);
    }
    return dottedPaths.length > 0 ? dottedPaths : [path];
  }

  private interpolatePathForDots(
    path: Array<{ lat: number; lng: number }>,
    targetSpacingMeters: number
  ): Array<{ lat: number; lng: number }> {
    if (path.length < 2) {
      return path;
    }
    const result: Array<{ lat: number; lng: number }> = [path[0]];
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      const segmentDistance = this.haversineDistanceLatLng(start, end);
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

  private haversineDistanceLatLng(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
    const R = 6371000;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const dLat = lat2 - lat1;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const sinHalfLat = Math.sin(dLat / 2);
    const sinHalfLng = Math.sin(dLng / 2);
    const h = sinHalfLat * sinHalfLat + Math.cos(lat1) * Math.cos(lat2) * sinHalfLng * sinHalfLng;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  private isAscendSegmentType(segmentType: string): boolean {
    const normalized = segmentType as LineSegmentType;
    return normalized === 'SKINNING' || normalized === 'BOOT_SECTION';
  }

  private extractClickedPosition(event: any): { lat: number; lng: number; altitude?: number } | null {
    const pos = event?.position || event?.detail?.position;
    if (!pos) {
      return null;
    }

    const lat = typeof pos.lat === 'function' ? pos.lat() : pos.lat;
    const lng = typeof pos.lng === 'function' ? pos.lng() : pos.lng;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return null;
    }

    const altitude = typeof pos.altitude === 'function' ? pos.altitude() : pos.altitude;
    return {
      lat,
      lng,
      ...(Number.isFinite(altitude) ? { altitude } : {}),
    };
  }

  private getMapElement(): any | null {
    return this.map3dRef?.nativeElement ?? null;
  }

  private async resolveMaps3dLibrary(): Promise<any> {
    const mapsApi = (globalThis as any)?.google?.maps;
    if (!mapsApi) {
      throw new Error('Google Maps API unavailable');
    }
    if (mapsApi.maps3d?.Map3DElement) {
      return mapsApi.maps3d;
    }
    const importLibrary = mapsApi.importLibrary;
    if (typeof importLibrary === 'function') {
      const imported = await importLibrary.call(mapsApi, 'maps3d');
      if (imported?.Map3DElement || imported?.Polyline3DElement) {
        return imported;
      }
    }
    throw new Error('Maps 3D library unavailable');
  }

  private getDistanceKm(latA: number, lngA: number, latB: number, lngB: number): number {
    const earthRadiusKm = 6371;
    const dLat = this.degr2rad(latB - latA);
    const dLng = this.degr2rad(lngB - lngA);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degr2rad(latA)) * Math.cos(this.degr2rad(latB)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  private degr2rad(degr: number): number {
    return (degr * Math.PI) / 180;
  }
}
