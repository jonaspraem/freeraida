import { Component, Input, OnInit } from '@angular/core';
import { ILine, ILineSegment, ILocation, LineSegmentType } from '../../../models/interfaces/types';
import { CONFIG } from '../../../dictionary/config';
import { COLOR_DICTIONARY } from '../../../dictionary/color-dictionary';
const polyEncoder = require('@mapbox/polyline');
import { flattenLineSegments } from '../../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-line-map-list',
  templateUrl: './line-map-list.component.html',
})

/**
 * @Author Jonas Praem
 * Constructs google static map
 */
export class LineMapListComponent implements OnInit {
  @Input() line: ILine;
  public request: string;

  public ngOnInit(): void {
    this.constructRequest();
  }

  private constructRequest(): void {
    const staticMapUrl = CONFIG.STATIC_MAPS_ENDPOINT;
    const apiKey = CONFIG.getGoogleMapsKey();
    const flattenedLocations = flattenLineSegments(this.line);
    if (flattenedLocations.length === 0) {
      this.request = '';
      return;
    }
    const markerStart = flattenedLocations[0].latitude + ',' + flattenedLocations[0].longitude;
    const markerFinish =
      flattenedLocations[flattenedLocations.length - 1].latitude +
      ',' +
      flattenedLocations[flattenedLocations.length - 1].longitude;

    // OPTIONS
    const weight = 3;
    const pathParam = (this.line.segments || [])
      .flatMap((segment: ILineSegment) => this.buildSegmentPathParams(segment, weight))
      .join('');
    const startColor = 'green';
    const startLabel = 'S';
    const finishColor = 'black';
    const finishLabel = 'F';
    const mapType = 'terrain';

    // PARAMS
    const sizeParam = '?size=250x200';
    const startMarkerParam = '&markers=' + 'color:' + startColor + '%7Clabel:' + startLabel + '%7C' + markerStart;
    const finishMarkerParam = '&markers=' + 'color:' + finishColor + '%7Clabel:' + finishLabel + '%7C' + markerFinish;
    const optionsParam = '&maptype=' + mapType;
    const apiKeyParam = apiKey ? '&key=' + apiKey : '';

    this.request =
      staticMapUrl + sizeParam + pathParam + startMarkerParam + finishMarkerParam + optionsParam + apiKeyParam;
  }

  private getSegmentColorEncoded(segmentType: string): string {
    const color = COLOR_DICTIONARY.get(segmentType) || '#404040';
    return color.slice(1);
  }

  private buildSegmentPathParams(segment: ILineSegment, weight: number): string[] {
    const points = (segment.locations || []).map((loc: ILocation) => [loc.latitude, loc.longitude]);
    if (points.length < 2) {
      return [];
    }
    const segmentColor = this.getSegmentColorEncoded(segment.type);
    if (!this.isAscendSegmentType(segment.type)) {
      const polyline = polyEncoder.encode(points);
      return ['&path=weight:' + weight + '%7Ccolor:0x' + segmentColor + '%7Cenc:' + polyline];
    }

    const interpolated = this.interpolatePathForDots(points, 20);
    const dottedParams: string[] = [];
    for (let i = 0; i < interpolated.length - 1; i += 2) {
      const dottedPolyline = polyEncoder.encode([interpolated[i], interpolated[i + 1]]);
      dottedParams.push('&path=weight:' + weight + '%7Ccolor:0x' + segmentColor + '%7Cenc:' + dottedPolyline);
    }
    return dottedParams;
  }

  private interpolatePathForDots(points: number[][], targetSpacingMeters: number): number[][] {
    if (points.length < 2) {
      return points;
    }
    const result: number[][] = [points[0]];
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const segmentDistance = this.haversineDistance(start, end);
      const numPoints = Math.max(1, Math.floor(segmentDistance / targetSpacingMeters));
      for (let j = 1; j <= numPoints; j++) {
        const t = j / numPoints;
        result.push([start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t]);
      }
    }
    return result;
  }

  private haversineDistance(a: number[], b: number[]): number {
    const R = 6371000;
    const lat1 = (a[0] * Math.PI) / 180;
    const lat2 = (b[0] * Math.PI) / 180;
    const dLat = lat2 - lat1;
    const dLng = ((b[1] - a[1]) * Math.PI) / 180;
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
