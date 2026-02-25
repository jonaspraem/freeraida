import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { LineService } from '../../core/services/line.service';
import { COLOR_DICTIONARY } from '../../dictionary/color-dictionary';
import { CONFIG } from '../../dictionary/config';
import { IExploreLine, ILine } from '../../models/interfaces/types';

@Component({
  standalone: false,
  selector: 'app-explore-page',
  templateUrl: './explore.page.component.html',
})
export class ExplorePageComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap) map: GoogleMap;

  public lines: IExploreLine[] = [];
  public selectedLine: IExploreLine | undefined;
  public center = { lat: 0, lng: 0 };
  public zoom = 2;
  public apiReady = false;
  public mapReady = false;
  public isLoading = false;
  public hasError = false;
  public isSelectedLineLoading = false;
  public selectedLinePath: { lat: number; lng: number }[] = [];
  public selectedPolylineOptions = {
    strokeColor: '#404040',
    strokeWeight: 3,
    geodesic: false,
  };
  public options = {
    mapTypeId: 'terrain' as const,
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };
  private readonly _destroy$ = new Subject<void>();
  private selectedLineRequestId = 0;

  constructor(
    private readonly lineService: LineService,
    public colorDictionary: COLOR_DICTIONARY,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cdRef: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  public ngOnInit(): void {
    this.ensureGoogleMapsApiLoaded();
    this.fetchExploreLines();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onMapInitialized(): void {
    this.zone.run(() => {
      this.mapReady = true;
      this.fitToBounds();
      this.cdRef.detectChanges();
    });
  }

  public selectLine(line: IExploreLine): void {
    this.selectedLine = line;
    this.selectedPolylineOptions.strokeColor = this.colorDictionary.get(line.sport) || '#404040';
    this.loadSelectedLinePath(line._id);
  }

  public getMarkerOptions(line: IExploreLine): any {
    const color = this.colorDictionary.get(line.sport) || '#404040';
    const markerOptions: any = {
      title: line.name + ' by ' + line.username,
    };
    if ((globalThis as any)?.google?.maps?.SymbolPath) {
      markerOptions.icon = {
        path: (globalThis as any).google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 1,
        scale: this.selectedLine && this.selectedLine._id === line._id ? 8 : 6,
      };
    }
    return markerOptions;
  }

  public getSelectedStartPosition(): { lat: number; lng: number } | undefined {
    return this.selectedLinePath.length > 0 ? this.selectedLinePath[0] : undefined;
  }

  public getSelectedEndPosition(): { lat: number; lng: number } | undefined {
    return this.selectedLinePath.length > 1 ? this.selectedLinePath[this.selectedLinePath.length - 1] : undefined;
  }

  public getSelectedStartMarkerOptions(): any {
    const color = this.selectedPolylineOptions.strokeColor || '#404040';
    const markerOptions: any = {
      title: 'Selected line start',
      zIndex: 1001,
    };
    if ((globalThis as any)?.google?.maps?.SymbolPath) {
      markerOptions.icon = {
        path: (globalThis as any).google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 8,
      };
    }
    return markerOptions;
  }

  public getSelectedEndMarkerOptions(): any {
    const color = this.selectedPolylineOptions.strokeColor || '#404040';
    const markerOptions: any = {
      title: 'Selected line end',
      zIndex: 1000,
    };
    if ((globalThis as any)?.google?.maps?.SymbolPath) {
      markerOptions.icon = {
        path: (globalThis as any).google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 6,
      };
    }
    return markerOptions;
  }

  private fetchExploreLines(): void {
    this.isLoading = true;
    this.hasError = false;
    this.lineService.getExploreLines()
      .pipe(
        timeout(15000),
        takeUntil(this._destroy$),
        finalize(() => {
          this.zone.run(() => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          });
        })
      )
      .subscribe({
        next: (lines) => {
          this.zone.run(() => {
            this.lines = (lines || []).filter((line) =>
              !!line &&
              !!line.startLocation &&
              Number.isFinite(line.startLocation.latitude) &&
              Number.isFinite(line.startLocation.longitude)
            );
            if (this.lines.length > 0) {
              this.selectLine(this.lines[0]);
            } else {
              this.selectedLine = undefined;
              this.selectedLinePath = [];
            }
            this.fitToBounds();
            this.cdRef.detectChanges();
          });
        },
        error: () => {
          this.zone.run(() => {
            this.lines = [];
            this.selectedLine = undefined;
            this.selectedLinePath = [];
            this.hasError = true;
            this.cdRef.detectChanges();
          });
        },
      });
  }

  private loadSelectedLinePath(lineId: string): void {
    if (!lineId) {
      this.selectedLinePath = [];
      return;
    }
    const requestId = ++this.selectedLineRequestId;
    this.isSelectedLineLoading = true;
    this.lineService.getLine(lineId)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (line: ILine) => {
          if (requestId !== this.selectedLineRequestId) {
            return;
          }
          this.selectedLinePath = Array.isArray(line.locations)
            ? line.locations.map((loc) => ({
              lat: loc.latitude,
              lng: loc.longitude,
            }))
            : [];
          if (line.sport) {
            this.selectedPolylineOptions.strokeColor = this.colorDictionary.get(line.sport) || '#404040';
          }
          this.isSelectedLineLoading = false;
        },
        error: () => {
          if (requestId !== this.selectedLineRequestId) {
            return;
          }
          this.selectedLinePath = [];
          this.isSelectedLineLoading = false;
        },
      });
  }

  private ensureGoogleMapsApiLoaded(): void {
    if ((globalThis as any)?.google?.maps) {
      this.markApiReady();
      return;
    }

    const existingScript = this.document.getElementById('google-maps-js-api') as HTMLScriptElement | null;
    if (existingScript) {
      if ((globalThis as any)?.google?.maps) {
        this.markApiReady();
        return;
      }
      existingScript.addEventListener('load', () => this.markApiReady());
      return;
    }

    const apiKey = CONFIG.getGoogleMapsKey();
    const script = this.document.createElement('script');
    const query = apiKey ? '?key=' + encodeURIComponent(apiKey) : '';
    script.id = 'google-maps-js-api';
    script.src = 'https://maps.googleapis.com/maps/api/js' + query;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => this.markApiReady());
    this.document.head.appendChild(script);
  }

  private markApiReady(): void {
    this.zone.run(() => {
      this.apiReady = true;
      this.cdRef.detectChanges();
      this.fitToBounds();
    });
  }

  private fitToBounds(): void {
    if (!this.apiReady || !this.mapReady || !this.map || this.lines.length === 0 || !(globalThis as any)?.google?.maps) {
      return;
    }
    const nativeMap = this.map.googleMap;
    if (!nativeMap) {
      return;
    }
    const mapsApi = (globalThis as any).google.maps;
    const bounds = new mapsApi.LatLngBounds();
    this.lines.forEach((line: IExploreLine) => {
      const lat = line.startLocation.latitude;
      const lng = line.startLocation.longitude;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return;
      }
      bounds.extend({
        lat,
        lng,
      });
    });
    nativeMap.fitBounds(bounds);
  }
}
