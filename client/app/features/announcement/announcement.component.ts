import { Component, Input, OnInit } from "@angular/core";
import { IAnnouncement } from "../../models/interfaces/types";
import { AnnouncementViewModel } from "../../models/viewmodels/announcement.model";

@Component({
    selector: 'app-announcement',
    templateUrl: './announcement.component.html'
})

export class AnnouncementComponent implements OnInit {
    @Input() private readonly announcement_data: IAnnouncement;
    public announcement: AnnouncementViewModel;

    ngOnInit(): void {
        this.announcement = new AnnouncementViewModel(this.announcement_data);
    }
}