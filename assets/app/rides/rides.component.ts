import { Component, OnInit } from "@angular/core";
import { TrackedLine } from "../objects/models/tracked-line.model";
import { Line } from "../objects/models/line.model";
import { RidesService } from "./rides.service";

@Component({
    selector: 'app-rides',
    templateUrl: './rides.component.html',
    styleUrls: ['./rides.component.css']
})

export class RidesComponent implements OnInit {
    public unregistered_line_list: TrackedLine[];
    public line_list: Line[];

    constructor(private rides_service: RidesService) {}

    ngOnInit(): void {
        this.rides_service.getTrackedLines().subscribe(data => {
            console.log(JSON.stringify(data));
            this.unregistered_line_list = TrackedLine.fabricateList(data.obj);
        });

        this.rides_service.getUserLines().subscribe(data => {
            console.log(JSON.stringify(data));
            this.line_list = Line.fabricateList(data.obj);
        });
    }
}