import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";

@Injectable()

export class GoogleAuthService {

    constructor(private http: Http, private errorService: ErrorService) {}

    verifyGoogleLogin(token) {
        console.log(token);
        const body = JSON.stringify(token);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/googleauthentication', body, {headers: headers})
            .map((response: Response) => {
            console.log(JSON.stringify(response));
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signOut() {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
}