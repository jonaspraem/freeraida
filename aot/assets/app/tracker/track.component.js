import { Component } from "@angular/core";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { TrackedLine } from "../objects/models/tracked-line.model";
import { LineLocation } from "../objects/models/line-location.model";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { TrackService } from "./track.service";
// Images
var ascent = require('../../images/track-interface/mountaineering.jpg');
var descent = require('../../images/track-interface/descent.jpg');
var tour = require('../../images/track-interface/tour.jpg');
var track_header = require('../../images/track-interface/trackicon.png');
var TrackPageComponent = /** @class */ (function () {
    function TrackPageComponent(color_dictionary, track_service) {
        this.color_dictionary = color_dictionary;
        this.track_service = track_service;
        // Images
        this.ascent = ascent;
        this.descent = descent;
        this.tour = tour;
        this.track_header = track_header;
        this.duration = '0:00';
        this.tracked_line = new TrackedLine('0', []);
        // Time Calculation
        this.location = {};
        this.ticks = 0;
    }
    TrackPageComponent.prototype.startTracking = function () {
        var _this = this;
        this.isTracking = true;
        this.duration = '0:00';
        this.ticks = 0;
        this.tracked_line = new TrackedLine('0', []);
        var ticker = TimerObservable.create(5000, 5000);
        this.subscription_ticker = ticker.subscribe(function (t) { return _this.onTimeOut(t); });
        var timer = TimerObservable.create(1000, 1000);
        this.subscription_timer = timer.subscribe(function (t) {
            _this.ticks = t;
            _this.duration = _this.getTime();
        });
    };
    TrackPageComponent.prototype.stopTracking = function () {
        this.isTracking = false;
        this.subscription_ticker.unsubscribe();
        this.subscription_timer.unsubscribe();
        this.track_service.postTrackedLine(this.tracked_line).subscribe(function (d) { return console.log(d); });
    };
    TrackPageComponent.prototype.onTimeOut = function (data) {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            _this.location = position.coords;
            // in your case
            // in your case
            _this.tracked_line.locations.push(new LineLocation(_this.getTime(), position.coords.latitude, position.coords.longitude));
        });
    };
    TrackPageComponent.prototype.getTime = function () {
        var time = this.ticks;
        var sec_display;
        var min_display;
        var min = time / 60;
        var sec = time % 60;
        if (sec < 10)
            sec_display = "0" + sec.toString().substring(0, 1);
        else
            sec_display = sec.toString();
        if (min.toString().indexOf('.') > 0)
            min_display = min.toString().substring(0, min.toString().indexOf('.'));
        else
            min_display = min.toString();
        return min_display + ':' + sec_display;
    };
    TrackPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-track-page',
                    templateUrl: './track.component.html',
                    styleUrls: ['./track.component.css']
                },] },
    ];
    /** @nocollapse */
    TrackPageComponent.ctorParameters = function () { return [
        { type: COLOR_DICTIONARY, },
        { type: TrackService, },
    ]; };
    return TrackPageComponent;
}());
export { TrackPageComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/tracker/track.component.js.map