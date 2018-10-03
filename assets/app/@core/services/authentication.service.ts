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
        this.http.post(this.config.getEndpoint() + '/api/authentication/login/', body, {headers: headers})
            .subscribe((data: any) => {
                console.log(data);
                localStorage.setItem('api_token', data.token);
                this.router.navigate(['/']);
            });
    }

    register(request: SignupInterface) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(this.config.getEndpoint() + '/api/authentication/register/', body, {headers: headers})
            .subscribe((data: any) => {
                console.log(data);
                localStorage.setItem('api_token', data.token);
                this.router.navigate(['/']);
            });
    }

    logout() {
        localStorage.removeItem('api_token');
        this.router.navigate(['/landing-page']);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('api_token');
        return !this.isTokenExpired(token);
    }

    private isTokenExpired(token: string) {
        if (token === null) {
            return true;
        }
        // check experation
        return false;
    }

}