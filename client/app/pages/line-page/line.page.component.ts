import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LineService } from "../../core/services/line.service";
import { ILine } from "../../models/interfaces/types";

@Component({
    selector: 'app-line-page',
    templateUrl: './line.page.component.html'
})

export class LinePageComponent implements OnInit {
    public line: ILine;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _lineService: LineService,
    ) {}

    public ngOnInit(): void {
        this._activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this._lineService.getLine(id).subscribe(line => {
                this.line = line;
                console.log(id, this.line);
            });
        });
    }
}