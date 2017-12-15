import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { LineTransferModel } from "./lineTransfer.model";
import { Observable } from "rxjs/Observable";
import { MapMarker } from "./mapmarker.model";

@Injectable()

export class LineService {

    constructor(private http: HttpClient, private errorService: ErrorService) {}

    addLine(line: LineTransferModel) {
        const body = JSON.stringify(line);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token')
            ? '?token=' + localStorage.getItem('id_token')
            : '';
        console.log(body);
        return this.http.post('http://localhost:3000/lineservice/newline/' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const markers = [];
                for (let i = 0; i < result.markers.length; i++) {
                    markers.push(new MapMarker(
                        result.markers[i].name,
                        result.markers[i].lat,
                        result.markers[i].lng
                    ));
                }
                const line = new LineTransferModel(
                    result.lineName,
                    markers,
                    result.danger_level,
                    result.tree_level,
                    result.rock_level,
                    result.cliff_level,

                );
                return line;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getLines(username: string) {
        return this.http.get('http://localhost:3000/lineservice/'+username)
            .map((response: Response) => {
                const lines = response.json().obj;
                let transformedLines: LineTransferModel[] = [];
                for (let line of lines) {
                    let route: MapMarker[] = [];
                    for (let marker of line.markers) {
                        route.push(new MapMarker(
                           marker.markerName,
                           marker.lat,
                           marker.lng
                        ));
                    }
                    transformedLines.push(new LineTransferModel(
                        line.lineName,
                        route,
                        line.danger_level,
                        line.tree_level,
                        line.rock_level,
                        line.cliff_level
                    ));
                }
                return transformedLines;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}