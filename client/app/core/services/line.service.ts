import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs';
import { CONFIG } from "../../dictionary/config";
import { ILine, ILineLocation } from "../../models/interfaces/types";
import { Observable } from "rxjs";

@Injectable()

export class LineService {

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    public getLineInfo(line: ILineLocation[]): Observable<any> {
        const body = JSON.stringify(line);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        return this.http.post(this.config.getEndpoint() + '/api/location-service/', body, {headers: headers, params: new HttpParams().set('token', token)})
    }

    public saveLine(line: ILine): Observable<any> {
        const body = JSON.stringify(line);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        return this.http.post(this.config.getEndpoint() + '/api/line/new', body, {headers: headers, params: new HttpParams().set('token', token)})
    }

    public getUserLines(username: string): Observable<ILine[]> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        return this.http.get<ILine[]>(this.config.getEndpoint() + '/api/line/user/'+username, {headers: headers, params: new HttpParams().set('token', token)})
    }

    public getLine(id: string): Observable<ILine> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<ILine>(this.config.getEndpoint() + '/api/line/get/' + id, {headers: headers})
    }

    public updateLine(line: ILine): Observable<ILine> {
        const body = JSON.stringify(line);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        return this.http.patch<ILine>(this.config.getEndpoint() + '/api/line/' + line._id, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    //
    // addLine(line: Line) {
    //     const body = JSON.stringify(line);
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('id_token');
    //     return this.http.post(this.config.getEndpoint() + '/lineservice/newline/', body, {headers: headers, params: new HttpParams().set('token', token)})
    // }
    //
    // getTrackedLine(id: string) {
    //     const token = localStorage.getItem('id_token');
    //     return this.http.get<TrackedLineResponse>(this.config.getEndpoint() + '/lineservice/tracked-line/' + id, {params: new HttpParams().set('token', token)});
    // }
    //
    // confirmLine(id: string, line) {
    //     const body = JSON.stringify(line);
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('id_token');
    //     return this.http.post<TrackedLineResponse>(this.config.getEndpoint() + '/lineservice/confirm-line/' + id, body, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // getLines(username: string) {
    //     const token = localStorage.getItem('id_token');
    //     return this.http.get<LineListResponse>(this.config.getEndpoint() + '/lineservice/user/' + username, {params: new HttpParams().set('token', token)});
    // }
    //
    // getHeightMap(line: Line) {
    //     const token = localStorage.getItem('id_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     return this.http.get<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map/'+line._id, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // getHeightMapUnregistered(line: TrackedLine) {
    //     const token = localStorage.getItem('id_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     return this.http.get<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map-unregistered/'+line._id, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // getDistance(line: Line) {
    //     const token = localStorage.getItem('id_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     return this.http.get<DistanceResponse>(this.config.getEndpoint() + '/line-info/distance/' + line._id, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // getDistanceUnregistered(line: TrackedLine) {
    //     const token = localStorage.getItem('id_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     return this.http.get<DistanceResponse>(this.config.getEndpoint() + '/line-info/distance-unregistered/' + line._id, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // getDynamicDistance(markers: MapMarker[]) {
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const body = JSON.stringify(markers);
    //     return this.http.post<DistanceResponse>(this.config.getEndpoint() + '/line-info/calculate-distance/', body,{headers: headers});
    // }
    //
    // getDynamicHeightMap(markers: MapMarker[]) {
    //     const token = localStorage.getItem('id_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const body = JSON.stringify(markers);
    //     return this.http.post<HeightMapResponse>(this.config.getEndpoint() + '/line-info/height-map/', body,{headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    //

}