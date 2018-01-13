import { Component } from "@angular/core";

// Images
const ascent = require('../../images/track-interface/mountaineering.jpg');
const descent = require('../../images/track-interface/descent.jpg');
const tour = require('../../images/track-interface/tour.jpg');

@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css']
})

export class TrackPageComponent {
    public ascent = ascent;
    public descent = descent;
    public tour = tour;

}