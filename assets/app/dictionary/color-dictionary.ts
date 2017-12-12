import { Injectable } from "@angular/core";

@Injectable()

export class COLOR_DICTIONARY {
    private static COLOR_MAP: Map<string, string> = new Map<string, string>();

    constructor() {
        COLOR_DICTIONARY.COLOR_MAP.set('primary', '#141D2F');
        COLOR_DICTIONARY.COLOR_MAP.set('secondary', '#6495ED');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#166FD5');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#D33C5B');
        COLOR_DICTIONARY.COLOR_MAP.set('tour', '#E4BD00');
        COLOR_DICTIONARY.COLOR_MAP.set('address', '#42BCF1');
    }

    get(key: string) {
        return COLOR_DICTIONARY.COLOR_MAP.get(key);
    }
}