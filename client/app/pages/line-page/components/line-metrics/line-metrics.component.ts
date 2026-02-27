import { Component, Input } from '@angular/core';
import { ILine, ILineLocation } from '../../../../models/interfaces/types';

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
    this.metrics = this.computeMetrics();
  }

  public get line(): ILine {
    return this._line;
  }

  public metrics: ILineMetrics = this.createEmptyMetrics();
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

  private computeMetrics(): ILineMetrics {
    const locations = this.line?.locations;
    if (!Array.isArray(locations) || locations.length === 0) {
      return this.createEmptyMetrics();
    }

    const metrics: ILineMetrics = this.createEmptyMetrics();
    metrics.pointCount = locations.length;

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

    let uphillSlopeSum = 0;
    let uphillSlopeCount = 0;
    let downhillSlopeSum = 0;
    let downhillSlopeCount = 0;
    let absoluteSlopeSum = 0;
    let absoluteSlopeCount = 0;
    let maxUphillPercent = Number.NEGATIVE_INFINITY;
    let maxDownhillPercent = Number.POSITIVE_INFINITY;

    for (let i = 1; i < locations.length; i++) {
      const current = locations[i];
      const previous = locations[i - 1];
      const segmentDistanceKm = this.resolveSegmentDistanceKm(current, previous);
      const currentElevation = Number(current?.elevation);
      const previousElevation = Number(previous?.elevation);

      if (!Number.isFinite(segmentDistanceKm) || segmentDistanceKm <= 0) {
        continue;
      }

      const segmentDistanceMeters = segmentDistanceKm * 1000;
      const deltaElevationMeters = currentElevation - previousElevation;
      if (!Number.isFinite(deltaElevationMeters)) {
        continue;
      }

      const slopeRatio = deltaElevationMeters / segmentDistanceMeters;
      const slopePercent = slopeRatio * 100;
      const slopeDegrees = this.toDegrees(Math.atan(slopeRatio));
      metrics.validSegmentCount += 1;
      metrics.totalDistanceKm += segmentDistanceKm;

      if (deltaElevationMeters > 0) {
        metrics.totalAscentMeters += deltaElevationMeters;
      } else if (deltaElevationMeters < 0) {
        metrics.totalDescentMeters += Math.abs(deltaElevationMeters);
      }

      if (slopePercent > 0) {
        uphillSlopeSum += slopePercent;
        uphillSlopeCount += 1;
        if (slopePercent > maxUphillPercent) {
          maxUphillPercent = slopePercent;
          metrics.steepestUphill = { percent: slopePercent, degrees: slopeDegrees };
        }
      } else if (slopePercent < 0) {
        downhillSlopeSum += slopePercent;
        downhillSlopeCount += 1;
        if (slopePercent < maxDownhillPercent) {
          maxDownhillPercent = slopePercent;
          metrics.steepestDownhill = { percent: slopePercent, degrees: slopeDegrees };
        }
      }

      absoluteSlopeSum += Math.abs(slopePercent);
      absoluteSlopeCount += 1;
    }

    metrics.totalElevationTraversedMeters = metrics.totalAscentMeters + metrics.totalDescentMeters;
    metrics.averageUphillSlope = uphillSlopeCount > 0 ? this.toSlopePair(uphillSlopeSum / uphillSlopeCount) : null;
    metrics.averageDownhillSlope = downhillSlopeCount > 0 ? this.toSlopePair(downhillSlopeSum / downhillSlopeCount) : null;
    metrics.averageAbsoluteSlope = absoluteSlopeCount > 0 ? this.toSlopePair(absoluteSlopeSum / absoluteSlopeCount) : null;
    return metrics;
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
