import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import { Profile } from "./profile.model";

@Injectable()

export class ProfileService {

    constructor(private http: Http, private errorService: ErrorService) {}

    getProfile(userId: string) {
        return this.http.get('http://localhost:3000/profile/'+userId)
            .map((response: Response) => {
                const result = response.json();
                const profile = new Profile(
                    result.obj.user._id,
                    result.obj.bio
                );
                return profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}