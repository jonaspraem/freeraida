import { Injectable } from "@angular/core";
var CONFIG = /** @class */ (function () {
    function CONFIG() {
    }
    CONFIG.prototype.getEndpoint = function () {
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