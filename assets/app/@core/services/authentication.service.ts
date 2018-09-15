import { Injectable } from "@angular/core";
import { CONFIG } from "../../dictionary/config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Interfaces
import { LoginRequest } from "../interfaces/authentication/LoginRequest";
import { SignUpRequest } from "../interfaces/authentication/SignUpRequest";

@Injectable()

export class AuthenticationService {

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    login(request: LoginRequest) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.config.getEndpoint() + '/authentication/login/', body, {headers: headers});
    }

    signUp(request: SignUpRequest) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.config.getEndpoint() + '/authentication/sign-up/', body, {headers: headers});
    }

}