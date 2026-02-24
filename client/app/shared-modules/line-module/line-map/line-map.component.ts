import { Component, Input, OnInit } from '@angular/core';
import { ILine, ILocation, IPolylineCoordinates } from '../../../models/interfaces/types';
import { COLOR_DICTIONARY } from '../../../dictionary/color-dictionary';

@Component({
  standalone: false,
  selector: 'app-line-map',
  templateUrl: './line-map.component.html',
})
export class LineMapComponent implements OnInit {
  @Input() line: ILine;
  @Input() height: number;
  public polyCoords: IPolylineCoordinates[];
  public latitude: number;
  public longitude: number;
  public startLocation: ILocation;
  public endLocation: ILocation;

  constructor(public colorDictionary: COLOR_DICTIONARY) {}

  public ngOnInit(): void {
    this.calculateLineCenter();
    this.startLocation = this.line.locations[0];
    this.endLocation = this.line.locations[this.line.locations.length - 1];
    this.updatePolyCords();
  }

  updatePolyCords() {
    let coords: IPolylineCoordinates[] = [];
    let prev_lat;
    let prev_lng;
    for (let loc of this.line.locations) {
      if (prev_lat && prev_lng)
        coords.push({
          org_lat: prev_lat,
          org_lng: prev_lng,
          destination_lat: loc.latitude,
          destination_lng: loc.longitude,
        });
      prev_lat = loc.latitude;
      prev_lng = loc.longitude;
    }
    this.polyCoords = coords;
  }

  getAverageLat() {
    let lat = 0;
    for (let loc of this.line.locations) {
      lat += loc.latitude;
    }
    return lat / this.line.locations.length;
  }

  getAverageLng() {
    let lng = 0;
    for (let loc of this.line.locations) {
      lng += loc.longitude;
    }
    return lng / this.line.locations.length;
  }

  rad2degr(rad: number): number { return rad * 180 / Math.PI; }
  degr2rad(degr: number): number { return degr * Math.PI / 180; }

  calculateLineCenter(): void {
    const locations = this.line.locations;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i < locations.length; i++) {
        var lat = this.degr2rad(locations[i].latitude);
        var lng = this.degr2rad(locations[i].longitude);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / locations.length;
    var avgY = sumY / locations.length;
    var avgZ = sumZ / locations.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    this.latitude = this.rad2degr(lat);
    this.longitude = this.rad2degr(lng);
  }
}
