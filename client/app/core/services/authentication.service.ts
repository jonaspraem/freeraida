import { Injectable } from "@angular/core";
import { CONFIG } from "../../dictionary/config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Interfaces
import { ILogin } from "../../models/interfaces/requests/authentication/login.interface";
import { IRegister } from "../../models/interfaces/requests/authentication/register.interface";
import { Router } from "@angular/router";

@Injectable()

export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private config: CONFIG,
        private router: Router
    ) {}

    login(request: ILogin) {
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(this.config.getEndpoint() + '/api/authentication/login/', body, {headers: headers})
            .subscribe((data: any) => {
                console.log(data);
                localStorage.setItem('api_token', data.token);
                this.router.navigate(['/']);
            });
    }

    register(request: IRegister) {
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
        console.log(token);
        if (token === null) {
            return true;
        }
        // check expiration
        return false;
    }

}