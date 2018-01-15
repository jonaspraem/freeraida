import { Component } from "@angular/core";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { Observable } from "rxjs/Observable";
import { UnregisteredLine } from "../objects/models/unregistered-line.model";
import { LineLocation } from "../objects/models/line-location.model";

// Images
const ascent = require('../../images/track-interface/mountaineering.jpg');
const descent = require('../../images/track-interface/descent.jpg');
const tour = require('../../images/track-interface/tour.jpg');
const track_header = require('../../images/track-interface/trackicon.png');

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css']
})

export class TrackPageComponent {
    public ascent = ascent;
    public descent = descent;
    public tour = tour;
    public track_header = track_header;

    private location = {};
    private ticker;
    private isTracking;
    private tracked_line: UnregisteredLine = new UnregisteredLine([]);
    private ticks = 0;

    constructor(public color_dictionary: COLOR_DICTIONARY) {}

    startTracking() {
        this.isTracking = true;

        this.ticker= Observable.timer(5000);
        this.ticker.subscribe((t) => this.onTimeOut(t));

        let timer = Observable.timer(1000);
        timer.subscribe(t=> this.ticks = t);
    }

    stopTracking() {
        this.isTracking = false;
        this.ticker = '';
    }

    onTimeOut(data) {
        console.log(data);
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            this.location = position.coords;
            // in your case
            this.tracked_line.locations.push(new LineLocation(this.ticks, position.coords.latitude, position.coords.longitude))
        });
    }




}