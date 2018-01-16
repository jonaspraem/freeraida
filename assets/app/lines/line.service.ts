import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Line } from "../objects/models/line.model";
import { MapMarker } from "../objects/models/mapmarker.model";
import { CONFIG } from "../dictionary/config";

import { LineObject } from "../objects/interfaces/line-object.interface";

interface LineListResponse {
    message: string;
    obj: LineObject[];
}

@Injectable()

export class LineService {

    constructor(private http: HttpClient,
                private errorService: ErrorService,
                private config: CONFIG
    ) {}

    addLine(line: Line) {
        const body = JSON.stringify(line);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/lineservice/newline/', body, {headers: headers, params: new HttpParams().set('token', token)})
    }

    getLines(username: string) {
        const token = localStorage.getItem('id_token');
        return this.http.get<LineListResponse>(this.config.getEndpoint() + '/lineservice/user/' + username, {params: new HttpParams().set('token', token)});
    }

    getHeightMap(markers: MapMarker[]) {
        const polyline = MapMarker.fabricatePolyline(markers);
        const token = localStorage.getItem('id_token');
        const body = JSON.stringify(markers);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        let parameters = new HttpParams()
            .set('key', this.config.getElevationKey())
            .set('locations', polyline)
            .set('path', polyline)
            .set('samples', markers.length.toString());
        return this.http.post(this.config.getEndpoint() + '/line-info/height-map/', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getDistance(markers: MapMarker[]) {
        const token = localStorage.getItem('id_token');
        const body = JSON.stringify(markers);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.config.getEndpoint() + '/line-info/distance/', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

}