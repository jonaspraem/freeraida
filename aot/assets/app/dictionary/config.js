import { Injectable, isDevMode } from "@angular/core";
var CONFIG = /** @class */ (function () {
    function CONFIG() {
    }
    CONFIG.prototype.getEndpoint = function () {
        if (isDevMode()) {
            return CONFIG.ENDPOINTS[0];
        }
        else
            return CONFIG.ENDPOINTS[1];
    };
    CONFIG.ENDPOINTS = ['http://localhost:3000', 'http://www.freeraida.com'];
    CONFIG.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CONFIG.ctorParameters = function () { return []; };
    return CONFIG;
}());
export { CONFIG };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/dictionary/config.js.map