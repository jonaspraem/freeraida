import 'rxjs';
import 'rxjs/add/operator/map'

import { Injectable } from "@angular/core";

@Injectable()

export class COLOR_DICTIONARY {
    private static COLOR_MAP: Map<string, string> = new Map<string, string>();
    private static ALIAS: Map<string, string> = new Map<string, string>();

    constructor() {
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

    get(key: string) {
        return COLOR_DICTIONARY.COLOR_MAP.get(key);
    }

    getAlias(key: string) {
        return COLOR_DICTIONARY.ALIAS.get(key);
    }
}