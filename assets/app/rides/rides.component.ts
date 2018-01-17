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
        console.log(this.line_list);
        this.rides_service.getTrackedLines().subscribe(data => {
            console.log(JSON.stringify(data));
            this.unregistered_line_list = TrackedLine.fabricateList(data.obj);
        });

        this.rides_service.getUserLines().subscribe(data => {
            console.log(JSON.stringify('userlines '+data));
            this.line_list = Line.fabricateList(data.obj);
        });
    }

    deleteUnregistered(_id: string) {
        for (let i = 0; i < this.unregistered_line_list.length; i++) {
            if (this.unregistered_line_list[i]._id == _id) this.unregistered_line_list.splice(i, 1);
        }
        this.rides_service.deleteTrackedLine(_id).subscribe(data => {
            console.log(data);
        });
    }

    deleteRegistered(_id: string) {
        for (let i = 0; i < this.line_list.length; i++) {
            if (this.line_list[i]._id == _id) this.line_list.splice(i, 1);
        }
        this.rides_service.deleteLine(_id).subscribe(data => {
            console.log(data);
        });
    }
}