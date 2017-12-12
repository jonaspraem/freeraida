import { Injectable } from "@angular/core";

@Injectable()

export class COLOR_DICTIONARY {
    private static COLOR_MAP: Map<string, string> = new Map<string, string>();

    constructor() {
        COLOR_DICTIONARY.COLOR_MAP.set('primary', '#141D2F');
        COLOR_DICTIONARY.COLOR_MAP.set('secondary', '#6495ED');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#448BDD');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#560000');
        COLOR_DICTIONARY.COLOR_MAP.set('tour', '#E1BC21');
        COLOR_DICTIONARY.COLOR_MAP.set('address', '#42BCF1');
    }

    get(key: string) {
        return COLOR_DICTIONARY.COLOR_MAP.get(key);
    }
}