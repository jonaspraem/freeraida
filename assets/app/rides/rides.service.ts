import { Injectable } from "@angular/core";
import { TrackedLineObject } from "../objects/interfaces/tracked-line-object.interface";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CONFIG } from "../dictionary/config";
import { ErrorService } from "../errors/error.service";

interface TrackedLineListResponse {
    message: string;
    obj: TrackedLineObject[];
}

@Injectable()

export class RidesService {

    constructor(private http: HttpClient,
                private errorService: ErrorService,
                private config: CONFIG
    ) {}

    getTrackedLines() {
        const token = localStorage.getItem('id_token');
        return this.http.get<TrackedLineListResponse>(this.config.getEndpoint() + '/lineservice/unregistered-lines/', {params: new HttpParams().set('token', token)});
    }

}