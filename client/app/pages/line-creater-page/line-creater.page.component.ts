import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { ILine, ILineLocation, ILocation, IPolylineCoordinates } from '../../models/interfaces/types';
import { LineService } from '../../core/services/line.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-line-creator',
  templateUrl: './line-creator.page.component.html',
})
export class LineCreatorPageComponent implements OnInit {
  public line: ILineLocation[] = [];
  public polyCords: IPolylineCoordinates[];
  public apiReady = false;
  public center = { lat: 45.8326222, lng: 6.8649248 };
  public zoom = 13;
  public mapOptions = {
    mapTypeId: 'terrain' as const,
    disableDefaultUI: true,
    clickableIcons: false,
    height: '700px',
    width: '100%',
  };
  public polylinePath: { lat: number; lng: number }[] = [];
  public polylineOptions = {
    strokeColor: '#404040',
    strokeWeight: 3,
    geodesic: true,
  };
  public counter: number = 0;
  public registerForm = new FormGroup({
    lineName: new FormControl('', Validators.required),
    lineSport: new FormControl('', Validators.required),
    lineType: new FormControl('', Validators.required),
  });

  // TODO move - make enum
  public sportsTypes = ['Skiing', 'Snowboarding', 'Free climbing', 'Mountaineering', 'Mountain biking'];
  public lineTypes = ['Trip', 'Whole day', 'Backcountry'];

  constructor(
    private _lineService: LineService,
    private _cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly zone: NgZone
  ) {}

  public ngOnInit(): void {
    this.ensureGoogleMapsApiLoaded();
    this.onFormChanges();
  }

  mapClicked($event: google.maps.MapMouseEvent): void {
    if (!$event.latLng) {
      return;
    }

    // Ensure new object spawn
    const prevLocations: ILineLocation[] = Object.assign([], this.line);
    // Push new
    const location: ILineLocation = {
      latitude: $event.latLng.lat(),
      longitude: $event.latLng.lng(),
      elevation: 20,
      distanceFromStart: (this.counter += this.counter),
    };
    prevLocations.push(location);
    this.line = prevLocations;
    this._cdRef.detectChanges();
    this.updateLine();
  }

  public updateLine() {
    this._lineService.getLineInfo(this.line).subscribe((data) => {
      this.line = data.obj;
      this.updatePolylinePath();
    });
    this.updatePolyCords();
  }

  updatePolyCords() {
    let cords: IPolylineCoordinates[] = [];
    let prev_lat;
    let prev_lng;
    for (let loc of this.line) {
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

  clickedMarker(loc: ILocation, index: number) {
    console.log('Clicked marker ', loc);
  }

  markerDragEnd(location: ILocation, index: number, $event: google.maps.MapMouseEvent): void {
    if (!$event.latLng) {
      return;
    }

    this.line[index] = {
      latitude: $event.latLng.lat(),
      longitude: $event.latLng.lng(),
    };
    this.updateLine();
  }

  public onClear(): void {
    this.line = [];
    this.polyCords = [];
    this.polylinePath = [];
    this.registerForm.reset();
  }

  public onSubmit(): void {
    let line: ILine = {
      name: this.registerForm.controls.lineName.value,
      sport: this.registerForm.controls.lineSport.value,
      discipline: this.registerForm.controls.lineType.value,
      locations: this.line,
    };
    this._lineService.saveLine(line).subscribe((res) => {
      this.onClear();
    });
  }

  private onFormChanges() {
    this.registerForm.get('lineSport').valueChanges.subscribe((selectedSport) => {
      if (selectedSport == '') {
        this.registerForm.get('lineType').reset();
        this.registerForm.get('lineType').disable();
      } else {
        this.registerForm.get('lineType').enable();
      }
    });
  }

  private updatePolylinePath(): void {
    this.polylinePath = this.line.map((loc) => ({
      lat: loc.latitude,
      lng: loc.longitude,
    }));
  }

  private ensureGoogleMapsApiLoaded(): void {
    if ((globalThis as any)?.google?.maps) {
      this.apiReady = true;
      return;
    }

    const existingScript = this.document.getElementById('google-maps-js-api') as HTMLScriptElement | null;
    if (existingScript) {
      if ((globalThis as any)?.google?.maps) {
        this.apiReady = true;
        return;
      }
      existingScript.addEventListener('load', () => {
        this.zone.run(() => {
          this.apiReady = true;
          this._cdRef.detectChanges();
        });
      });
      return;
    }

    const script = this.document.createElement('script');
    const apiKey = (globalThis as any)?.__env?.GOOGLE_MAPS_API_KEY || '';
    const query = apiKey ? '?key=' + encodeURIComponent(apiKey) : '';
    script.id = 'google-maps-js-api';
    script.src = 'https://maps.googleapis.com/maps/api/js' + query;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.zone.run(() => {
        this.apiReady = true;
        this._cdRef.detectChanges();
      });
    });
    this.document.head.appendChild(script);
  }
}
