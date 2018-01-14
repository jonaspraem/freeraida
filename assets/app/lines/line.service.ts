import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Line } from "../objects/models/line.model";
import { Observable } from "rxjs/Observable";
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
        // const body = JSON.stringify(line);
        // const headers = new Headers({'Content-Type': 'application/json'});
        // const token = localStorage.getItem('id_token')
        //     ? '?token=' + localStorage.getItem('id_token')
        //     : '';
        // console.log(body);
        // return this.http.post('http://localhost:3000/lineservice/newline/' + token, body, {headers: headers})
        //     .map((response: Response) => {
        //         const result = response.json().obj;
        //         const markers = [];
        //         for (let i = 0; i < result.markers.length; i++) {
        //             markers.push(new MapMarker(
        //                 result.markers[i].name,
        //                 result.markers[i].lat,
        //                 result.markers[i].lng
        //             ));
        //         }
        //         const line = new Line(
        //             result.lineName,
        //             markers,
        //             result.danger_level,
        //             result.tree_level,
        //             result.rock_level,
        //             result.cliff_level,
        //
        //         );
        //         return line;
        //     })
        //     .catch((error: Response) => {
        //         this.errorService.handleError(error.json());
        //         return Observable.throw(error.json());
        //     });
    }

    getLines(username: string) {
        const token = localStorage.getItem('id_token');
        return this.http.get<LineListResponse>(this.config.getEndpoint() + '/lineservice/' + username, {params: new HttpParams().set('token', token)});
        // return this.http.get('http://localhost:3000/lineservice/'+username)
        //     .map((response: Response) => {
        //         const lines = response.json().obj;
        //         let transformedLines: Line[] = [];
        //         for (let line of lines) {
        //             let route: MapMarker[] = [];
        //             for (let marker of line.markers) {
        //                 route.push(new MapMarker(
        //                    marker.markerName,
        //                    marker.lat,
        //                    marker.lng
        //                 ));
        //             }
        //             transformedLines.push(new Line(
        //                 line.lineName,
        //                 route,
        //                 line.danger_level,
        //                 line.tree_level,
        //                 line.rock_level,
        //                 line.cliff_level
        //             ));
        //         }
        //         return transformedLines;
        //     })
        //     .catch((error: Response) => {
        //         this.errorService.handleError(error.json());
        //         return Observable.throw(error.json());
        //     });
    }

}