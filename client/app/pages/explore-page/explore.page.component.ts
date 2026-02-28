import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { LineService } from '../../core/services/line.service';
import { COLOR_DICTIONARY } from '../../dictionary/color-dictionary';
import { CONFIG } from '../../dictionary/config';
import { IExploreLine, ILine, ILineSegment, LineSegmentType } from '../../models/interfaces/types';
import { flattenLineSegments } from '../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-explore-page',
  templateUrl: './explore.page.component.html',
})
export class ExplorePageComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap) map: GoogleMap;

  public allLines: IExploreLine[] = [];
  public lines: IExploreLine[] = [];
  public sportFilters: string[] = ['All'];
  public selectedSportFilter = 'All';
  public selectedLine: IExploreLine | undefined;
  public center = { lat: 0, lng: 0 };
  public zoom = 2;
  public apiReady = false;
  public mapReady = false;
  public isLoading = false;
  public hasError = false;
  public isSelectedLineLoading = false;
  public selectedLinePath: { lat: number; lng: number }[] = [];
  public selectedSegmentPaths: { type: string; path: { lat: number; lng: number }[] }[] = [];
  public selectedLineDetails: ILine | undefined;
  public polylineOptions = {
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
    this.zone.run(() => {
      this.selectedLine = line;
      this.selectedLineDetails = undefined;
      this.selectedSegmentPaths = [];
      this.loadSelectedLinePath(line._id);
      this.cdRef.detectChanges();
    });
  }

  public onSportFilterChange(sport: string): void {
    if (this.selectedSportFilter === sport) {
      return;
    }
    this.zone.run(() => {
      this.selectedSportFilter = sport;
      this.applySportFilter(false);
    });
  }

  public getSportFilterStyles(sport: string): { [key: string]: string } {
    const fallbackColor = this.colorDictionary.get('grey') || '#404040';
    const sportColor = sport === 'All' ? fallbackColor : this.colorDictionary.get(sport) || fallbackColor;

    return {
      'background-color': sportColor,
      'border-color': sportColor,
      color: '#ffffff',
    };
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
    const color = this.colorDictionary.get(this.selectedLineDetails?.sport) || '#404040';
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
    const color = this.colorDictionary.get(this.selectedLineDetails?.sport) || '#404040';
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

  public getPolylineOptions(segmentType: string): any {
    const strokeColor = this.colorDictionary.getSegmentColor(segmentType) || '#404040';
    if (this.isAscendSegmentType(segmentType)) {
      return {
        ...this.polylineOptions,
        strokeColor,
        strokeOpacity: 0,
        icons: [
          {
            icon: {
              path: 0, // google.maps.SymbolPath.CIRCLE
              fillColor: strokeColor,
              fillOpacity: 1,
              strokeColor,
              strokeOpacity: 1,
              strokeWeight: 0.5,
              scale: 2.5,
            },
            offset: '0',
            repeat: '8px',
          },
        ],
      };
    }
    return {
      ...this.polylineOptions,
      strokeColor,
      strokeOpacity: 1,
      icons: undefined,
    };
  }

  private isAscendSegmentType(segmentType: string): boolean {
    const normalized = segmentType as LineSegmentType;
    return normalized === 'SKINNING' || normalized === 'BOOT_SECTION';
  }

  private fetchExploreLines(): void {
    this.isLoading = true;
    this.hasError = false;
    this.lineService
      .getExploreLines()
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
            this.allLines = (lines || []).filter(
              (line) =>
                !!line &&
                !!line.startLocation &&
                Number.isFinite(line.startLocation.latitude) &&
                Number.isFinite(line.startLocation.longitude)
            );
            this.sportFilters = this.getSportFilters(this.allLines);
            this.applySportFilter(true);
          });
        },
        error: () => {
          this.zone.run(() => {
            this.allLines = [];
            this.lines = [];
            this.sportFilters = ['All'];
            this.selectedSportFilter = 'All';
            this.selectedLine = undefined;
            this.selectedLinePath = [];
            this.selectedLineDetails = undefined;
            this.hasError = true;
            this.cdRef.detectChanges();
          });
        },
      });
  }

  private loadSelectedLinePath(lineId: string): void {
    if (!lineId) {
      this.selectedLinePath = [];
      this.selectedSegmentPaths = [];
      this.selectedLineDetails = undefined;
      return;
    }
    const requestId = ++this.selectedLineRequestId;
    this.isSelectedLineLoading = true;
    this.lineService
      .getLine(lineId)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (line: ILine) => {
          if (requestId !== this.selectedLineRequestId) {
            return;
          }
          this.zone.run(() => {
            this.selectedLinePath = flattenLineSegments(line).map((loc) => ({
              lat: loc.latitude,
              lng: loc.longitude,
            }));
            this.selectedSegmentPaths = (line.segments || [])
              .map((segment: ILineSegment) => ({
                type: segment.type,
                path: (segment.locations || []).map((loc) => ({ lat: loc.latitude, lng: loc.longitude })),
              }))
              .filter((segment) => segment.path.length > 1);
            this.selectedLineDetails = line;
            this.isSelectedLineLoading = false;
            this.cdRef.detectChanges();
          });
        },
        error: () => {
          if (requestId !== this.selectedLineRequestId) {
            return;
          }
          this.zone.run(() => {
            this.selectedLinePath = [];
            this.selectedSegmentPaths = [];
            this.selectedLineDetails = undefined;
            this.isSelectedLineLoading = false;
            this.cdRef.detectChanges();
          });
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
    const queryParts: string[] = [];
    if (apiKey) {
      queryParts.push('key=' + encodeURIComponent(apiKey));
    }
    queryParts.push('v=beta');
    queryParts.push('loading=async');
    const query = queryParts.length > 0 ? '?' + queryParts.join('&') : '';
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
    if (
      !this.apiReady ||
      !this.mapReady ||
      !this.map ||
      this.lines.length === 0 ||
      !(globalThis as any)?.google?.maps
    ) {
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

  private applySportFilter(shouldFitBounds = false): void {
    this.lines =
      this.selectedSportFilter === 'All'
        ? [...this.allLines]
        : this.allLines.filter((line) => line.sport === this.selectedSportFilter);

    const selectedLineIsVisible = !!this.selectedLine && this.lines.some((line) => line._id === this.selectedLine?._id);

    if (!selectedLineIsVisible) {
      this.selectedLine = undefined;
      this.selectedLinePath = [];
      this.selectedSegmentPaths = [];
      this.selectedLineDetails = undefined;

      if (this.lines.length > 0) {
        this.selectLine(this.lines[0]);
      }
    }

    if (shouldFitBounds) {
      this.fitToBounds();
    }
    this.cdRef.detectChanges();
  }

  private getSportFilters(lines: IExploreLine[]): string[] {
    const uniqueSports = Array.from(new Set(lines.map((line) => line.sport).filter((sport) => !!sport))).sort((a, b) =>
      a.localeCompare(b)
    );
    return ['All', ...uniqueSports];
  }
}
