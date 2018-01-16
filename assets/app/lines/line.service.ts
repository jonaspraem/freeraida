import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Line } from "../objects/models/line.model";
import { CONFIG } from "../dictionary/config";

import { LineObject } from "../objects/interfaces/line-object.interface";
import { HeightMapObject } from "../objects/interfaces/height-map-object.interface";
import { DistancePoint } from "../objects/models/distance/distance-point.model";

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

    getHeightMap(line: Line) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map/'+line._id, {headers: headers, params: new HttpParams().set('token', token)});
    }

    getDistance(line: Line) {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<DistanceResponse>(this.config.getEndpoint() + '/line-info/distance/' + line._id, {headers: headers, params: new HttpParams().set('token', token)});
    }

}