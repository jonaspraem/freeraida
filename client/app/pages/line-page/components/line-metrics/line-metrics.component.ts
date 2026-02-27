import { Component, Input } from '@angular/core';
import { ILine, ILineLocation, LineSegmentType } from '../../../../models/interfaces/types';
import { DOWNHILL_SEGMENT_TYPES, UPHILL_SEGMENT_TYPES, flattenLineSegments } from '../../../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-line-metrics',
  templateUrl: './line-metrics.component.html',
  styleUrls: ['./line-metrics.component.scss'],
})
export class LineMetricsComponent {
  @Input()
  public set line(value: ILine) {
    this._line = value;
    this.rebuildMetrics();
  }

  public get line(): ILine {
    return this._line;
  }

  public totalMetrics: ILineMetrics = this.createEmptyMetrics();
  public ascendMetrics: ILineMetrics = this.createEmptyMetrics();
  public descendMetrics: ILineMetrics = this.createEmptyMetrics();
  private _line: ILine;

  public formatDistance(value: number | null, enabled: boolean = true): string {
    return enabled && Number.isFinite(value) ? `${Number(value).toFixed(2)} km` : '-';
  }

  public formatMeters(value: number | null, enabled: boolean = true): string {
    return enabled && Number.isFinite(value) ? `${Math.round(Number(value))} m` : '-';
  }

  public formatPercent(value: number | null, decimals: number = 1, enabled: boolean = true): string {
    return enabled && Number.isFinite(value) ? `${Number(value).toFixed(decimals)}%` : '-';
  }

  public formatSlopePair(pair: ISlopePair | null): string {
    if (!pair || !Number.isFinite(pair.percent) || !Number.isFinite(pair.degrees)) {
      return '-';
    }
    return `${pair.percent.toFixed(1)}% (${pair.degrees.toFixed(1)}°)`;
  }

  private rebuildMetrics(): void {
    const locations = flattenLineSegments(this.line);
    if (!Array.isArray(locations) || locations.length === 0) {
      this.totalMetrics = this.createEmptyMetrics();
      this.ascendMetrics = this.createEmptyMetrics();
      this.descendMetrics = this.createEmptyMetrics();
      return;
    }

    const segmentSamples = this.collectSegmentSamples();
    this.totalMetrics = this.computeTotalMetrics(locations, segmentSamples);
    this.ascendMetrics = this.computeDirectionalMetrics(segmentSamples, 'ASCEND');
    this.descendMetrics = this.computeDirectionalMetrics(segmentSamples, 'DESCEND');
  }

  private collectSegmentSamples(): ISegmentSample[] {
    const samples: ISegmentSample[] = [];
    const lineSegments = Array.isArray(this.line?.segments) ? this.line.segments : [];
    for (const lineSegment of lineSegments) {
      const segmentLocations = Array.isArray(lineSegment?.locations) ? lineSegment.locations : [];
      for (let i = 1; i < segmentLocations.length; i++) {
        const current = segmentLocations[i];
        const previous = segmentLocations[i - 1];
        const segmentDistanceKm = this.resolveSegmentDistanceKm(current, previous);
        const currentElevation = Number(current?.elevation);
        const previousElevation = Number(previous?.elevation);

        if (!Number.isFinite(segmentDistanceKm) || segmentDistanceKm <= 0) {
          continue;
        }
        if (!Number.isFinite(currentElevation) || !Number.isFinite(previousElevation)) {
          continue;
        }

        const deltaElevationMeters = currentElevation - previousElevation;
        const slopeRatio = deltaElevationMeters / (segmentDistanceKm * 1000);
        const slopePercent = slopeRatio * 100;
        samples.push({
          segmentType: lineSegment.type,
          distanceKm: segmentDistanceKm,
          deltaElevationMeters,
          slopePercent,
          slopeDegrees: this.toDegrees(Math.atan(slopeRatio)),
        });
      }
    }
    return samples;
  }

  private computeTotalMetrics(locations: ILineLocation[], samples: ISegmentSample[]): ILineMetrics {
    const metrics = this.createEmptyMetrics();
    metrics.pointCount = locations.length;
    metrics.validSegmentCount = samples.length;

    const elevations = locations
      .map((loc) => Number(loc?.elevation))
      .filter((elevation) => Number.isFinite(elevation));

    if (elevations.length > 0) {
      const minElevation = Math.min(...elevations);
      const maxElevation = Math.max(...elevations);
      metrics.minElevation = minElevation;
      metrics.maxElevation = maxElevation;
      metrics.elevationRange = maxElevation - minElevation;
    }

    const startElevation = Number(locations[0]?.elevation);
    const endElevation = Number(locations[locations.length - 1]?.elevation);
    if (Number.isFinite(startElevation) && Number.isFinite(endElevation)) {
      metrics.netElevationChange = endElevation - startElevation;
    }

    let absoluteSlopeSum = 0;
    let absoluteSlopeCount = 0;
    let maxUphillPercent = Number.NEGATIVE_INFINITY;
    let maxDownhillPercent = Number.POSITIVE_INFINITY;

    for (const sample of samples) {
      metrics.totalDistanceKm += sample.distanceKm;

      if (this.isUphillSegmentType(sample.segmentType) && sample.deltaElevationMeters > 0) {
        metrics.totalAscentMeters += sample.deltaElevationMeters;
      } else if (this.isDownhillSegmentType(sample.segmentType) && sample.deltaElevationMeters < 0) {
        metrics.totalDescentMeters += Math.abs(sample.deltaElevationMeters);
      }

      if (this.isUphillSegmentType(sample.segmentType) && sample.slopePercent > 0 && sample.slopePercent > maxUphillPercent) {
        maxUphillPercent = sample.slopePercent;
        metrics.steepestUphill = { percent: sample.slopePercent, degrees: sample.slopeDegrees };
      } else if (
        this.isDownhillSegmentType(sample.segmentType) &&
        sample.slopePercent < 0 &&
        sample.slopePercent < maxDownhillPercent
      ) {
        maxDownhillPercent = sample.slopePercent;
        metrics.steepestDownhill = { percent: sample.slopePercent, degrees: sample.slopeDegrees };
      }

      absoluteSlopeSum += Math.abs(sample.slopePercent);
      absoluteSlopeCount += 1;
    }

    metrics.totalElevationTraversedMeters = metrics.totalAscentMeters + metrics.totalDescentMeters;
    metrics.averageUphillSlope = this.computeAverageSlopePair(samples, (sample) =>
      this.isUphillSegmentType(sample.segmentType) && sample.slopePercent > 0
    );
    metrics.averageDownhillSlope = this.computeAverageSlopePair(samples, (sample) =>
      this.isDownhillSegmentType(sample.segmentType) && sample.slopePercent < 0
    );
    metrics.averageAbsoluteSlope = absoluteSlopeCount > 0 ? this.toSlopePair(absoluteSlopeSum / absoluteSlopeCount) : null;
    return metrics;
  }

  private computeDirectionalMetrics(samples: ISegmentSample[], direction: 'ASCEND' | 'DESCEND'): ILineMetrics {
    const metrics = this.createEmptyMetrics();
    const filtered = samples.filter((sample) =>
      direction === 'ASCEND'
        ? this.isUphillSegmentType(sample.segmentType)
        : this.isDownhillSegmentType(sample.segmentType)
    );
    metrics.validSegmentCount = filtered.length;
    metrics.totalDistanceKm = filtered.reduce((sum, sample) => sum + sample.distanceKm, 0);
    metrics.pointCount = filtered.length + (filtered.length > 0 ? 1 : 0);

    if (direction === 'ASCEND') {
      const ascending = filtered.filter((sample) => sample.deltaElevationMeters > 0);
      metrics.totalAscentMeters = ascending.reduce((sum, sample) => sum + sample.deltaElevationMeters, 0);
      metrics.steepestUphill = ascending.reduce<ISlopePair | null>((best, sample) => {
        if (!best || sample.slopePercent > best.percent) {
          return { percent: sample.slopePercent, degrees: sample.slopeDegrees };
        }
        return best;
      }, null);
      metrics.averageUphillSlope = this.computeAverageSlopePair(ascending, () => true);
      metrics.totalElevationTraversedMeters = metrics.totalAscentMeters;
    } else {
      const descending = filtered.filter((sample) => sample.deltaElevationMeters < 0);
      metrics.totalDescentMeters = descending.reduce((sum, sample) => sum + Math.abs(sample.deltaElevationMeters), 0);
      metrics.steepestDownhill = descending.reduce<ISlopePair | null>((best, sample) => {
        if (!best || sample.slopePercent < best.percent) {
          return { percent: sample.slopePercent, degrees: sample.slopeDegrees };
        }
        return best;
      }, null);
      metrics.averageDownhillSlope = this.computeAverageSlopePair(descending, () => true);
      metrics.totalElevationTraversedMeters = metrics.totalDescentMeters;
    }

    metrics.averageAbsoluteSlope = this.computeAverageSlopePair(filtered, () => true, true);
    return metrics;
  }

  private computeAverageSlopePair(
    samples: ISegmentSample[],
    predicate: (sample: ISegmentSample) => boolean,
    asAbsolute = false
  ): ISlopePair | null {
    const filtered = samples.filter(predicate);
    if (filtered.length === 0) {
      return null;
    }
    const average =
      filtered.reduce((sum, sample) => sum + (asAbsolute ? Math.abs(sample.slopePercent) : sample.slopePercent), 0) /
      filtered.length;
    return this.toSlopePair(average);
  }

  private resolveSegmentDistanceKm(current: ILineLocation, previous: ILineLocation): number {
    const directDistance = Number(current?.distanceFromLast);
    if (Number.isFinite(directDistance)) {
      return directDistance;
    }

    const previousFromStart = Number(previous?.distanceFromStart);
    const currentFromStart = Number(current?.distanceFromStart);
    if (Number.isFinite(previousFromStart) && Number.isFinite(currentFromStart)) {
      return currentFromStart - previousFromStart;
    }
    return Number.NaN;
  }

  private toSlopePair(percent: number): ISlopePair | null {
    if (!Number.isFinite(percent)) {
      return null;
    }
    return {
      percent,
      degrees: this.toDegrees(Math.atan(percent / 100)),
    };
  }

  private toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  private isUphillSegmentType(segmentType: string): boolean {
    return UPHILL_SEGMENT_TYPES.includes(segmentType as LineSegmentType);
  }

  private isDownhillSegmentType(segmentType: string): boolean {
    return DOWNHILL_SEGMENT_TYPES.includes(segmentType as LineSegmentType);
  }

  private createEmptyMetrics(): ILineMetrics {
    return {
      totalDistanceKm: 0,
      totalAscentMeters: 0,
      totalDescentMeters: 0,
      totalElevationTraversedMeters: 0,
      steepestUphill: null,
      steepestDownhill: null,
      averageUphillSlope: null,
      averageDownhillSlope: null,
      averageAbsoluteSlope: null,
      minElevation: null,
      maxElevation: null,
      elevationRange: null,
      netElevationChange: null,
      pointCount: 0,
      validSegmentCount: 0,
    };
  }
}

interface ISlopePair {
  percent: number;
  degrees: number;
}

interface ILineMetrics {
  totalDistanceKm: number;
  totalAscentMeters: number;
  totalDescentMeters: number;
  totalElevationTraversedMeters: number;
  steepestUphill: ISlopePair | null;
  steepestDownhill: ISlopePair | null;
  averageUphillSlope: ISlopePair | null;
  averageDownhillSlope: ISlopePair | null;
  averageAbsoluteSlope: ISlopePair | null;
  minElevation: number | null;
  maxElevation: number | null;
  elevationRange: number | null;
  netElevationChange: number | null;
  pointCount: number;
  validSegmentCount: number;
}

interface ISegmentSample {
  segmentType: string;
  distanceKm: number;
  deltaElevationMeters: number;
  slopePercent: number;
  slopeDegrees: number;
}
