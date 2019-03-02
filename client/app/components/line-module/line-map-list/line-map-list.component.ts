import { Component, Input, OnInit } from "@angular/core";
import { ILine, ILocation } from "../../../models/interfaces/types";
import { CONFIG } from "../../../dictionary/config";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";
const polyEncoder = require('@mapbox/polyline');

@Component({
    selector: 'app-line-map-list',
    templateUrl: './line-map-list.component.html'
 })

/**
 * @Author Jonas Praem
 * Constructs google static map
 */

export class LineMapListComponent implements OnInit {
    @Input() line: ILine;
    public request: string;

    public ngOnInit(): void {
        this.constructRequest();
    }

    private constructRequest(): void {
        const staticMapUrl = CONFIG.STATIC_MAPS_ENDPOINT;
        const apiKey = CONFIG.GOOGLE_MAPS_KEY;
        const path: number[][] = [];

        for (let index in this.line.locations) {
            const loc: ILocation = this.line.locations[index];
            path.push([loc.latitude, loc.longitude]);
        }
        const polyline: string = polyEncoder.encode(path);
        const markerStart = this.line.locations[0].latitude + ',' + this.line.locations[0].longitude;
        const markerFinish = this.line.locations[this.line.locations.length-1].latitude + ',' + this.line.locations[this.line.locations.length-1].longitude;

        // OPTIONS
        const weight = 3;
        const color = COLOR_DICTIONARY.get(this.line.sport);
        const startColor = 'green';
        const startLabel = 'S';
        const finishColor = 'black';
        const finishLabel = 'F';

        // PARAMS
        const sizeParam = '?size=250x200';
        const pathParam = '&path=weight:' + weight + '%7Ccolor:' + color + '%7Cenc:' + polyline;
        const startMarkerParam = '&markers=' + 'color:' + startColor + '%7Clabel:' + startLabel + '%7C' + markerStart;
        const finishMarkerParam = '&markers=' + 'color:' + finishColor + '%7Clabel:' + finishLabel + '%7C' + markerFinish;
        const apiKeyParam = '&key=' + apiKey;

        this.request = staticMapUrl + sizeParam + pathParam + startMarkerParam + finishMarkerParam + apiKeyParam;
        console.log(this.request);
    }
}