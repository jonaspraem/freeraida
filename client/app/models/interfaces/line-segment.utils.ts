import { ILine, ILineLocation, ILineSegment, LineSegmentType } from './types';

export const UPHILL_SEGMENT_TYPES: LineSegmentType[] = ['SKINNING', 'BOOT_SECTION'];
export const DOWNHILL_SEGMENT_TYPES: LineSegmentType[] = ['FREERIDE'];

export function flattenLineSegments(line?: ILine | null): ILineLocation[] {
  if (!line || !Array.isArray(line.segments)) {
    return [];
  }
  return line.segments.reduce((acc: ILineLocation[], segment: ILineSegment) => {
    if (Array.isArray(segment?.locations)) {
      return acc.concat(segment.locations);
    }
    return acc;
  }, []);
}

export function segmentTypeToLabel(segmentType: LineSegmentType): string {
  switch (segmentType) {
    case 'FREERIDE':
      return 'Freeride';
    case 'SKINNING':
      return 'Skinning';
    case 'BOOT_SECTION':
      return 'Boot section';
    default:
      return segmentType;
  }
}
