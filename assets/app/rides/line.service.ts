import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { LineTransferModel } from "./lineTransfer.model";
import { Observable } from "rxjs/Observable";
import { MapMarker } from "./mapmarker.model";

@Injectable()

export class LineService {

    constructor(private http: Http, private errorService: ErrorService) {}

    addLine(line: LineTransferModel) {
        const body = JSON.stringify(line);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
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

}