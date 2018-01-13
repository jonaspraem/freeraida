import { Component, EventEmitter, Output } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
var MapContentComponent = /** @class */ (function () {
    function MapContentComponent(gMaps) {
        this.gMaps = gMaps;
        this.onMapLoad = new EventEmitter();
    }
    MapContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gMaps.getNativeMap().then(function (map) {
            _this.onMapLoad.emit(map);
        });
    };
    MapContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'core-map-content',
                    template: '',
                },] },
    ];
    /** @nocollapse */
    MapContentComponent.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper, },
    ]; };
    MapContentComponent.propDecorators = {
        "onMapLoad": [{ type: Output },],
    };
    return MapContentComponent;
}());
export { MapContentComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/map-content.js.map