import { Injectable } from "@angular/core";

@Injectable()

export class ColorDictionary {
    private static COLOR_MAP: Map<string, string> = new Map<string, string>();

    constructor() {
        ColorDictionary.COLOR_MAP.set('primary', '#141D2F');
        ColorDictionary.COLOR_MAP.set('secondary', '#6495ED');
        ColorDictionary.COLOR_MAP.set('ascent', '#166FD5');
        ColorDictionary.COLOR_MAP.set('ascent', '#D33C5B');
        ColorDictionary.COLOR_MAP.set('tour', '#E4BD00');
        ColorDictionary.COLOR_MAP.set('address', '#42BCF1');
    }
}