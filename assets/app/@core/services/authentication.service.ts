import { Injectable } from "@angular/core";
import { CONFIG } from "../../dictionary/config";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EnlistRequest } from "../interfaces/auth";

@Injectable()

export class AuthenticationService {

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    enlist(request: EnlistRequest) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.config.getEndpoint() + '/authentication/sign-up/', body, {headers: headers});
    }

    login(request) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.config.getEndpoint() + '/authentication/login/', body, {headers: headers});
    }

}