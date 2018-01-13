import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";
var COLOR_DICTIONARY = /** @class */ (function () {
    function COLOR_DICTIONARY() {
        COLOR_DICTIONARY.COLOR_MAP.set('primary', '#141D2F');
        COLOR_DICTIONARY.COLOR_MAP.set('secondary', '#6495ED');
        COLOR_DICTIONARY.COLOR_MAP.set('secondary_light', '#C1D4F7');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#448BDD');
        COLOR_DICTIONARY.COLOR_MAP.set('ascent', '#560000');
        COLOR_DICTIONARY.COLOR_MAP.set('tour', '#E1BC21');
        COLOR_DICTIONARY.COLOR_MAP.set('address', '#42BCF1');
        COLOR_DICTIONARY.COLOR_MAP.set('available', '#12E112');
        COLOR_DICTIONARY.COLOR_MAP.set('not-available', '#F60C00');
    }
    COLOR_DICTIONARY.prototype.get = function (key) {
        return COLOR_DICTIONARY.COLOR_MAP.get(key);
    };
    COLOR_DICTIONARY.COLOR_MAP = new Map();
    COLOR_DICTIONARY.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    COLOR_DICTIONARY.ctorParameters = function () { return []; };
    return COLOR_DICTIONARY;
}());
export { COLOR_DICTIONARY };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/dictionary/color-dictionary.js.map