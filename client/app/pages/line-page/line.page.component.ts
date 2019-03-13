import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LineService } from "../../core/services/line.service";

@Component({
    selector: 'app-line-page',
    templateUrl: './line.page.component.html'
})

export class LinePageComponent implements OnInit {
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _lineService: LineService,
    ) {}

    public ngOnInit(): void {
        this._activatedRoute.params.subscribe(params => {
            const id = params['id'];
            console.log(id);
        });
    }
}