import 'rxjs/Rx';
import { Http, Headers, Response } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { User } from "../auth/user.model";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthService {

    constructor(private http: Http, private errorService: ErrorService) {}

    follow(userid: string) {
        const body = JSON.stringify(userid);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/connect/follow', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    unfollow(userid: string) {
        const body = JSON.stringify(userid);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/connect/unfollow', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}