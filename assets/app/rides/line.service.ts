import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { LineTransferModel } from "./lineTransfer.model";
import { Observable } from "rxjs/Observable";

@Injectable()

export class LineService {

    constructor(private http: Http, private errorService: ErrorService) {}

    addLine(line: LineTransferModel) {
        const body = JSON.stringify(line);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        console.log(body);
        return this.http.post('http://localhost:3000/lineservice/newline' + token, body, {headers: headers})
            .map((response: Response) => {
                console.log(response.json());
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}