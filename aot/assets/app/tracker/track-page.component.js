import { Component } from "@angular/core";
// Images
var ascent = require('../../images/track-interface/mountaineering.jpg');
var descent = require('../../images/track-interface/descent.jpg');
var tour = require('../../images/track-interface/tour.jpg');
var TrackPageComponent = /** @class */ (function () {
    function TrackPageComponent() {
        this.ascent = ascent;
        this.descent = descent;
        this.tour = tour;
    }
    TrackPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-track-page',
                    templateUrl: './track-page.component.html',
                    styleUrls: ['./track-page.component.css']
                },] },
    ];
    /** @nocollapse */
    TrackPageComponent.ctorParameters = function () { return []; };
    return TrackPageComponent;
}());
export { TrackPageComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/tracker/track-page.component.js.map