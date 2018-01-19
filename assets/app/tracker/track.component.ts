import { Component } from "@angular/core";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { TrackedLine } from "../objects/models/tracked-line.model";
import { LineLocation } from "../objects/models/line-location.model";
import { Observable } from "rxjs/Observable";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from "rxjs/Subscription";
import { TrackService } from "./track.service";

// Images
const ascent = require('../../images/track-interface/mountaineering.jpg');
const descent = require('../../images/track-interface/descent.jpg');
const tour = require('../../images/track-interface/tour.jpg');
const track_header = require('../../images/track-interface/trackicon.png');

@Component({
    selector: 'app-track-page',
    templateUrl: './track.component.html',
    styleUrls: ['./track.component.css']
})

export class TrackPageComponent {
    // Images
    public ascent = ascent;
    public descent = descent;
    public tour = tour;
    public track_header = track_header;

    // Information
    public isTracking;
    public duration: string = '0:00';
    public tracked_line: TrackedLine = new TrackedLine('0', '',[]);

    // Time Calculation
    private location = {};
    private subscription_ticker: Subscription;
    private subscription_timer: Subscription;
    private ticks = 0;


    constructor(public color_dictionary: COLOR_DICTIONARY,
                private track_service: TrackService
    ) {}

    startTracking() {
        this.isTracking = true;
        this.duration = '0:00';
        this.ticks = 0;
        this.tracked_line = new TrackedLine('0', '',[]);

        let ticker = TimerObservable.create(5000, 5000);
        this.subscription_ticker = ticker.subscribe((t) => this.onTimeOut(t));

        let timer = TimerObservable.create(1000, 1000);
        this.subscription_timer = timer.subscribe(t => {
            this.ticks = t;
            this.duration = this.getTime();
        });
    }

    stopTracking() {
        this.isTracking = false;
        this.subscription_ticker.unsubscribe();
        this.subscription_timer.unsubscribe();
        this.track_service.postTrackedLine(this.tracked_line).subscribe(d => console.log(d));
    }

    onTimeOut(data) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            this.location = position.coords;
            // in your case
            this.tracked_line.locations.push(new LineLocation(position.coords.latitude, position.coords.longitude))
        });
    }

    getTime() {
        let time = this.ticks;
        let sec_display: string;
        let min_display: string;
        let min = time/60;
        let sec = time%60;
        if (sec < 10) sec_display = "0" + sec.toString().substring(0, 1);
        else sec_display = sec.toString();
        if (min.toString().indexOf('.') > 0) min_display = min.toString().substring(0, min.toString().indexOf('.'));
        else min_display = min.toString();
        return min_display + ':' + sec_display;
    }




}