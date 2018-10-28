import { Component, Input } from "@angular/core";
import { IAnnouncement } from "../../models/interfaces/announcement/announcement.interface";

@Component({
    selector: 'app-announcement-list',
    templateUrl: './announcement-list.component.html'
})

export class AnnouncementListComponent {
    @Input() list: IAnnouncement;


}