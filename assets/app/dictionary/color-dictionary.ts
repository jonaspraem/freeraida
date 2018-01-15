import 'rxjs/Rx';
import 'rxjs/add/operator/map'

import { Injectable } from "@angular/core";

@Injectable()

export class COLOR_DICTIONARY {
    private static COLOR_MAP: Map<string, string> = new Map<string, string>();

    constructor() {
        COLOR_DICTIONARY.COLOR_MAP.set('primary', '#141D2F');
        COLOR_DICTIONARY.COLOR_MAP.set('secondary', '#6495ED');
        COLOR_DICTIONARY.COLOR_MAP.set('black', '#000000');
        COLOR_DICTIONARY.COLOR_MAP.set('white', '#FFFFFF');
        COLOR_DICTIONARY.COLOR_MAP.set('secondary_light', '#C1D4F7');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#448BDD');
        COLOR_DICTIONARY.COLOR_MAP.set('descent', '#560000');
        COLOR_DICTIONARY.COLOR_MAP.set('tour', '#E1BC21');
        COLOR_DICTIONARY.COLOR_MAP.set('address', '#42BCF1');
        COLOR_DICTIONARY.COLOR_MAP.set('available', '#12E112');
        COLOR_DICTIONARY.COLOR_MAP.set('not-available', '#F60C00');
        // DANGER LEVELS
        COLOR_DICTIONARY.COLOR_MAP.set('Safe', '#08DB72');
        COLOR_DICTIONARY.COLOR_MAP.set('Caution', '#F6EC01');
        COLOR_DICTIONARY.COLOR_MAP.set('Danger', '#D00202');
        COLOR_DICTIONARY.COLOR_MAP.set('Extreme', '#F69D3A');

    }

    get(key: string) {
        return COLOR_DICTIONARY.COLOR_MAP.get(key);
    }
}