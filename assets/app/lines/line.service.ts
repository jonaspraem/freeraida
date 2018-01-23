import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Line } from "../objects/models/line.model";
import { CONFIG } from "../dictionary/config";

import { LineObject } from "../objects/interfaces/line-object.interface";
import { HeightMapObject } from "../objects/interfaces/height-map-object.interface";
import { DistancePoint } from "../objects/models/distance/distance-point.model";
import { TrackedLine } from "../objects/models/tracked-line.model";
import { MapMarker } from "../objects/models/mapmarker.model";
import { TrackedLineObject } from "../objects/interfaces/tracked-line-object.interface";

interface LineListResponse {
    message: string;
    obj: LineObject[];
}

interface HeightMapResponse {
    message: string;
    obj: HeightMapObject[];
}

interface DistanceResponse {
    message: string;
    obj: DistancePoint[];
}

interface TrackedLineResponse {
    message: string;
    obj: TrackedLineObject;
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

    getTrackedLine(id: string) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.get<TrackedLineResponse>(this.config.getEndpoint() + '/lineservice/tracked-line/' + id, {params: new HttpParams().set('token', token)});
    }

    getLines(username: string) {
        const token = localStorage.getItem('id_token');
        return this.http.get<LineListResponse>(this.config.getEndpoint() + '/lineservice/user/' + username, {params: new HttpParams().set('token', token)});
    }

    getHeightMap(line: Line) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map/'+line._id, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getHeightMapUnregistered(line: TrackedLine) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map-unregistered/'+line._id, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getDistance(line: Line) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<DistanceResponse>(this.config.getEndpoint() + '/line-info/distance/' + line._id, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getDistanceUnregistered(line: TrackedLine) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<DistanceResponse>(this.config.getEndpoint() + '/line-info/distance-unregistered/' + line._id, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getDynamicDistance(markers: MapMarker[]) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = JSON.stringify(markers);
        return this.http.post<DistanceResponse>(this.config.getEndpoint() + '/line-info/calculate-distance/', body,{headers: headers});
    }

    getDynamicHeightMap(markers: MapMarker[]) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = JSON.stringify(markers);
        return this.http.post<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map/', body,{headers: headers, params: new HttpParams().set('token', token)});
    }



}