import { Component, OnInit } from "@angular/core";
import { LineHistoryService } from "./line-history.service";
import { TrackedLine } from "../../objects/models/tracked-line.model";
import { Line } from "../../objects/models/line.model";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-rides',
    templateUrl: './line-history.component.html',
    styleUrls: ['./line-history.component.css']
})

export class LineHistoryComponent implements OnInit {
    public unregistered_line_list: TrackedLine[];
    public line_list: Line[];

    constructor(public color_dictionary: COLOR_DICTIONARY,
                private rides_service: LineHistoryService,
                private router: Router) {}

    ngOnInit(): void {
        this.rides_service.getTrackedLines().subscribe(data => {
            this.unregistered_line_list = TrackedLine.fabricateList(data.obj);
        });

        this.rides_service.getUserLines().subscribe(data => {
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

    goToRegister() {
        this.router.navigate(['home/register-line']);
    }

    goToTrack() {
        this.router.navigate(['home/track']);
    }
}