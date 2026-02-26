import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps';
import { ILine } from '../../../models/interfaces/types';
import { COLOR_DICTIONARY } from '../../../dictionary/color-dictionary';
import { CONFIG } from '../../../dictionary/config';

@Component({
  standalone: false,
  selector: 'app-line-map',
  templateUrl: './line-map.component.html',
})
export class LineMapComponent implements OnInit, OnChanges {
  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(MapPolyline) polyline: MapPolyline;
  @ViewChild('startMarker') startMarkerRef: MapMarker;
  @ViewChild('endMarker') endMarkerRef: MapMarker;

  @Input() line: ILine;
  @Input() height: number;
  public mapReady = false;
  public apiReady = false;
  public center: { lat: number; lng: number };
  public path: { lat: number; lng: number }[] = [];
  public startPosition: { lat: number; lng: number };
  public endPosition: { lat: number; lng: number };
  public zoom = 12;
  public options = {
    mapTypeId: 'terrain' as const,
    disableDefaultUI: true,
    draggable: false,
    disableDoubleClickZoom: true,
    clickableIcons: false,
    streetViewControl: false,
    zoomControl: false,
  };
  public polylineOptions = {
    strokeColor: '#404040',
    strokeWeight: 3,
    geodesic: false,
  };

  constructor(
    public colorDictionary: COLOR_DICTIONARY,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cdRef: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  public ngOnInit(): void {
    this.ensureGoogleMapsApiLoaded();
    this.rebuildMapData();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['line'] || changes['height']) {
      this.rebuildMapData();
      this.fitToBounds(true);
    }
  }

  public onMapInitialized(): void {
    this.mapReady = true;
    this.cdRef.detectChanges();
    this.fitToBounds(true);
  }

  private ensureGoogleMapsApiLoaded(): void {
    const globalScope = globalThis as any;
    if ((globalThis as any)?.google?.maps) {
      this.markApiReady();
      return;
    }

    if (globalScope.__freeraidaGoogleMapsLoadPromise) {
      globalScope.__freeraidaGoogleMapsLoadPromise
        .then(() => this.markApiReady())
        .catch(() => undefined);
      return;
    }

    const existingScript = this.document.getElementById('google-maps-js-api') as HTMLScriptElement | null;
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
        .catch(() => undefined);
      return;
    }

    const apiKey = CONFIG.getGoogleMapsKey();
    const script = this.document.createElement('script');
    const query = apiKey ? '?key=' + encodeURIComponent(apiKey) : '';
    script.id = 'google-maps-js-api';
    script.src = 'https://maps.googleapis.com/maps/api/js' + query;
    script.async = true;
    script.defer = true;
    globalScope.__freeraidaGoogleMapsLoadPromise = new Promise<void>((resolve, reject) => {
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener('error', () => reject(), { once: true });
    });
    globalScope.__freeraidaGoogleMapsLoadPromise
      .then(() => this.markApiReady())
      .catch(() => undefined);
    this.document.head.appendChild(script);
  }

  private rebuildMapData(): void {
    if (!this.line || !Array.isArray(this.line.locations) || this.line.locations.length === 0) {
      this.path = [];
      this.startPosition = undefined;
      this.endPosition = undefined;
      this.center = undefined;
      return;
    }

    this.path = this.line.locations.map((loc) => ({
      lat: loc.latitude,
      lng: loc.longitude,
    }));
    this.startPosition = this.path[0];
    this.endPosition = this.path[this.path.length - 1];
    this.center = this.getLineCenter(this.path);
    this.polylineOptions.strokeColor = this.colorDictionary.get(this.line.sport) || '#404040';
  }

  private fitToBounds(forceResize = false): void {
    if (!this.apiReady || !this.mapReady || !this.map || this.path.length === 0 || !(globalThis as any)?.google?.maps) {
      return;
    }

    const mapsApi = (globalThis as any).google.maps;
    const nativeMap = this.map.googleMap;
    if (!nativeMap) {
      return;
    }

    if (forceResize) {
      mapsApi.event.trigger(nativeMap, 'resize');
    }

    const bounds = new mapsApi.LatLngBounds();
    for (const point of this.path) {
      bounds.extend(point);
    }
    nativeMap.fitBounds(bounds);
  }

  private markApiReady(): void {
    this.zone.run(() => {
      this.apiReady = true;
      this.cdRef.detectChanges();
      this.fitToBounds(true);
    });
  }

  private getLineCenter(path: { lat: number; lng: number }[]): { lat: number; lng: number } {
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;

    for (const loc of path) {
      const lat = this.degr2rad(loc.lat);
      const lng = this.degr2rad(loc.lng);
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    const avgX = sumX / path.length;
    const avgY = sumY / path.length;
    const avgZ = sumZ / path.length;
    const lng = Math.atan2(avgY, avgX);
    const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    const lat = Math.atan2(avgZ, hyp);

    return { lat: this.rad2degr(lat), lng: this.rad2degr(lng) };
  }

  private rad2degr(rad: number): number {
    return (rad * 180) / Math.PI;
  }
  private degr2rad(degr: number): number {
    return (degr * Math.PI) / 180;
  }
}
