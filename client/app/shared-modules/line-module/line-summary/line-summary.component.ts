import { Component, Input } from '@angular/core';
import { ILine, ILineLocation, ILineSegment } from '../../../models/interfaces/types';
import { COLORS } from '../../../dictionary/colors';
import { COLOR_DICTIONARY } from '../../../dictionary/color-dictionary';
import {
  DOWNHILL_SEGMENT_TYPES,
  UPHILL_SEGMENT_TYPES,
  flattenLineSegments,
} from '../../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-line-summary',
  templateUrl: './line-summary.component.html',
})
export class LineSummaryComponent {
  @Input()
  public set line(value: ILine) {
    this._line = value;
    this.rebuildSummaryMetrics();
  }

  public get line(): ILine {
    return this._line;
  }
  public colors = COLORS;
  public hideHeightMapLegend: boolean = true;
  public summaryMetrics: ISummaryMetrics = this.createEmptySummaryMetrics();
  private _line: ILine;

  constructor(public COLOR_DICTIONARY: COLOR_DICTIONARY) {}

  public formatDistance(value: number): string {
    return Number.isFinite(value) ? `${Number(value).toFixed(2)} km` : '-';
  }

  public formatMeters(value: number): string {
    return Number.isFinite(value) ? `${Math.round(Number(value))} m` : '-';
  }

  public formatDate(date?: Date): string {
    if (!date) {
      return '-';
    }
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? '-' : parsed.toLocaleDateString();
  }

  public isSkiSport(sport?: string): boolean {
    return (sport || '').toLowerCase().includes('ski');
  }

  public isSnowboardSport(sport?: string): boolean {
    return (sport || '').toLowerCase().includes('snowboard');
  }

  private rebuildSummaryMetrics(): void {
    if (!this.line || !Array.isArray(this.line.segments)) {
      this.summaryMetrics = this.createEmptySummaryMetrics();
      return;
    }

    const flatLocations = flattenLineSegments(this.line);
    const samples = this.collectSamples(this.line.segments);
    const ascentSamples = samples.filter(
      (sample) => UPHILL_SEGMENT_TYPES.includes(sample.type as any) && sample.deltaMeters > 0
    );
    const descendSamples = samples.filter(
      (sample) => DOWNHILL_SEGMENT_TYPES.includes(sample.type as any) && sample.deltaMeters < 0
    );

    this.summaryMetrics = {
      pointCount: flatLocations.length,
      segmentCount: this.line.segments.length,
      totalDistanceKm: samples.reduce((sum, sample) => sum + sample.distanceKm, 0),
      totalAscentMeters: ascentSamples.reduce((sum, sample) => sum + sample.deltaMeters, 0),
      totalDescendMeters: descendSamples.reduce((sum, sample) => sum + Math.abs(sample.deltaMeters), 0),
      ascendDistanceKm: ascentSamples.reduce((sum, sample) => sum + sample.distanceKm, 0),
      descendDistanceKm: descendSamples.reduce((sum, sample) => sum + sample.distanceKm, 0),
    };
  }

  private collectSamples(segments: ILineSegment[]): ISummarySample[] {
    const samples: ISummarySample[] = [];
    for (const segment of segments) {
      const locations = Array.isArray(segment.locations) ? segment.locations : [];
      for (let i = 1; i < locations.length; i++) {
        const previous = locations[i - 1];
        const current = locations[i];
        const distanceKm = this.resolveSegmentDistanceKm(current, previous);
        if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
          continue;
        }
        const deltaMeters = Number(current?.elevation) - Number(previous?.elevation);
        if (!Number.isFinite(deltaMeters)) {
          continue;
        }
        samples.push({
          type: segment.type,
          distanceKm,
          deltaMeters,
        });
      }
    }
    return samples;
  }

  private resolveSegmentDistanceKm(current: ILineLocation, previous: ILineLocation): number {
    const directDistance = Number(current?.distanceFromLast);
    if (Number.isFinite(directDistance) && directDistance >= 0) {
      return directDistance;
    }
    const previousFromStart = Number(previous?.distanceFromStart);
    const currentFromStart = Number(current?.distanceFromStart);
    if (Number.isFinite(previousFromStart) && Number.isFinite(currentFromStart)) {
      return currentFromStart - previousFromStart;
    }
    return Number.NaN;
  }

  private createEmptySummaryMetrics(): ISummaryMetrics {
    return {
      pointCount: 0,
      segmentCount: 0,
      totalDistanceKm: 0,
      totalAscentMeters: 0,
      totalDescendMeters: 0,
      ascendDistanceKm: 0,
      descendDistanceKm: 0,
    };
  }
}

interface ISummaryMetrics {
  pointCount: number;
  segmentCount: number;
  totalDistanceKm: number;
  totalAscentMeters: number;
  totalDescendMeters: number;
  ascendDistanceKm: number;
  descendDistanceKm: number;
}

interface ISummarySample {
  type: string;
  distanceKm: number;
  deltaMeters: number;
}
