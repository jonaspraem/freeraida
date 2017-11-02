import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import { GoogleAuthModel } from "./googleauth.model";

@Injectable()

export class GoogleAuthService {

    constructor(private http: Http, private errorService: ErrorService) {}

    verifyGoogleLogin(token: string) {
        console.log('post');
        const model = new GoogleAuthModel(token);
        const body = JSON.stringify(model);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/verify-user', body, {headers: headers})
            .map((response: Response) => {
                return response;
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