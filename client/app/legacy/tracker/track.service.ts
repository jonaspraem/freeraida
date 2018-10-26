import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { TrackedLine } from "../objects/models/tracked-line.model";
import { CONFIG } from "../../dictionary/config";

@Injectable()

export class TrackService {

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    postTrackedLine(line: TrackedLine) {
        const body = JSON.stringify(line);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/lineservice/new-tracked-line/', body, {headers: headers, params: new HttpParams().set('token', token)})
    }
}