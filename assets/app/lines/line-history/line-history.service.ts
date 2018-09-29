import { Injectable } from "@angular/core";
import { TrackedLineObject } from "../../objects/interfaces/tracked-line-object.interface";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CONFIG } from "../../dictionary/config";
import { LineObject } from "../../objects/interfaces/line-object.interface";

interface TrackedLineResponse{
    message: string;
    obj: TrackedLineObject;
}

interface TrackedLineListResponse {
    message: string;
    obj: TrackedLineObject[];
}

interface LineListResponse {
    message: string;
    obj: LineObject[];
}

@Injectable()

export class LineHistoryService {

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    getTrackedLines() {
        const token = localStorage.getItem('id_token');
        return this.http.get<TrackedLineListResponse>(this.config.getEndpoint() + '/lineservice/unregistered-lines/', {params: new HttpParams().set('token', token)});
    }

    getUserLines() {
        const token = localStorage.getItem('id_token');
        return this.http.get<LineListResponse>(this.config.getEndpoint() + '/lineservice/user-lines/', {params: new HttpParams().set('token', token)});
    }

    deleteTrackedLine(_id: string) {
        const token = localStorage.getItem('id_token');
        return this.http.delete<TrackedLineResponse>(this.config.getEndpoint() + '/lineservice/remove-tracked-line/' + _id, {params: new HttpParams().set('token', token)});
    }

    deleteLine(_id: string) {
        const token = localStorage.getItem('id_token');
        return this.http.delete<TrackedLineResponse>(this.config.getEndpoint() + '/lineservice/remove-line/' + _id, {params: new HttpParams().set('token', token)});
    }

}