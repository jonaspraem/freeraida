import { Injectable } from "@angular/core";
import { CONFIG } from "../../dictionary/config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Interfaces
import { LoginInterface } from "../../@models/interfaces/authentication/login.interface";
import { SignupInterface } from "../../@models/interfaces/authentication/signup.interface";
import { Router } from "@angular/router";

@Injectable()

export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private config: CONFIG,
        private router: Router
    ) {}

    login(request: LoginInterface) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(this.config.getEndpoint() + '/authentication/login/', body, {headers: headers})
            .subscribe((data: any) => {
                console.log(data);
                localStorage.setItem('api_token', data.token);
                this.router.navigate(['/']);
            });
    }

    signup(request: SignupInterface) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(this.config.getEndpoint() + '/authentication/signup/', body, {headers: headers})
            .subscribe((data: any) => {
                console.log(data);
                localStorage.setItem('api_token', data.token);
                this.router.navigate(['/']);
            });
    }

    getUserProfileWithToken() {

    }

    getUserProfile(username: string) {

    }



}