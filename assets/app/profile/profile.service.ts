import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import { Profile } from "./profile.model";

@Injectable()

export class ProfileService {

    constructor(private http: Http, private errorService: ErrorService) {}

    getProfile(username: string) {
        return this.http.get('http://localhost:3000/profile/'+username)
            .map((response: Response) => {
                const result = response.json().obj;
                const profile = new Profile(
                    result.username,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following
                );
                return profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}