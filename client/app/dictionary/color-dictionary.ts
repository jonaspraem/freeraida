import { Injectable } from '@angular/core';
import { COLORS } from './colors';
import { LINE_TYPE } from './line-types';

@Injectable()
export class COLOR_DICTIONARY {
  private static COLOR_MAP: Map<string, string> = new Map<string, string>();
  private static ALIAS: Map<string, string> = new Map<string, string>();

  constructor() {
    COLOR_DICTIONARY.COLOR_MAP.set(LINE_TYPE.SKI, COLORS.SPORT_TYPE_SKIING);
    COLOR_DICTIONARY.COLOR_MAP.set(LINE_TYPE.SNOWBOARD, COLORS.SPORT_TYPE_SNOWBOARDING);
    COLOR_DICTIONARY.COLOR_MAP.set(LINE_TYPE.HIKING, COLORS.SPORT_TYPE_HIKING);
    COLOR_DICTIONARY.COLOR_MAP.set(LINE_TYPE.MOUNTAINEERING, COLORS.SPORT_TYPE_MOUNTAINEERING);
    COLOR_DICTIONARY.COLOR_MAP.set(LINE_TYPE.MOUNTAIN_BIKE, COLORS.SPORT_TYPE_MOUNTAIN_BIKE);

    // LEGACY
    // Main
    COLOR_DICTIONARY.COLOR_MAP.set('primary', '#052a02');
    COLOR_DICTIONARY.COLOR_MAP.set('secondary', '#1B1E1B');
    COLOR_DICTIONARY.COLOR_MAP.set('secondary_light', '#829480');
    COLOR_DICTIONARY.COLOR_MAP.set('third', '#D3EEDF');

    // Blues
    COLOR_DICTIONARY.COLOR_MAP.set('blue_primary', '#141D2F');
    COLOR_DICTIONARY.COLOR_MAP.set('blue_secondary', '#6495ED');
    COLOR_DICTIONARY.COLOR_MAP.set('blue_secondary_light', '#C1D4F7');

    // Tints
    COLOR_DICTIONARY.COLOR_MAP.set('black', '#000000');
    COLOR_DICTIONARY.COLOR_MAP.set('white', '#FFFFFF');
    COLOR_DICTIONARY.COLOR_MAP.set('grey', '#404040');
    COLOR_DICTIONARY.COLOR_MAP.set('sky-blue', '#0275D8');

    // Color Coding's
    COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#448BDD');
    COLOR_DICTIONARY.COLOR_MAP.set('descent', '#560000');
    COLOR_DICTIONARY.COLOR_MAP.set('tour', '#E1BC21');
    COLOR_DICTIONARY.COLOR_MAP.set('FREERIDE', '#560000');
    COLOR_DICTIONARY.COLOR_MAP.set('SKINNING', '#448BDD');
    COLOR_DICTIONARY.COLOR_MAP.set('BOOT_SECTION', '#E1BC21');

    // Other mains
    COLOR_DICTIONARY.COLOR_MAP.set('address', '#99C053');
    COLOR_DICTIONARY.COLOR_MAP.set('tracked', '#339988');

    // UTILITIES
    COLOR_DICTIONARY.COLOR_MAP.set('available', '#12E112');
    COLOR_DICTIONARY.COLOR_MAP.set('not-available', '#F60C00');

    // DANGER LEVELS
    COLOR_DICTIONARY.COLOR_MAP.set('safe', '#08DB72');
    COLOR_DICTIONARY.COLOR_MAP.set('caution', '#F6EC01');
    COLOR_DICTIONARY.COLOR_MAP.set('danger', '#F69D3A');
    COLOR_DICTIONARY.COLOR_MAP.set('extreme', '#D00202');

    this.setAlias();
  }

  private setAlias() {
    COLOR_DICTIONARY.ALIAS.set('backcountry', 'descent');
    COLOR_DICTIONARY.ALIAS.set('tour', 'tour');
    COLOR_DICTIONARY.ALIAS.set('climb', 'ascent');
  }

  static get(key: string) {
    return COLOR_DICTIONARY.COLOR_MAP.get(key);
  }

  static getEncoded(key: string) {
    return COLOR_DICTIONARY.COLOR_MAP.get(key).slice(1);
  }

  static getAlias(key: string) {
    return COLOR_DICTIONARY.ALIAS.get(key);
  }

  get(key: string) {
    return COLOR_DICTIONARY.COLOR_MAP.get(key);
  }

  getAlias(key: string) {
    return COLOR_DICTIONARY.ALIAS.get(key);
  }

  getSegmentColor(segmentType: string) {
    return COLOR_DICTIONARY.COLOR_MAP.get(segmentType) || COLOR_DICTIONARY.COLOR_MAP.get('grey');
  }
}
