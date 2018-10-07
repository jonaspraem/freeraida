import { Component } from "@angular/core";
import { faFeatherAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-announcement-writer',
    templateUrl: './announcement-writer.component.html'
})

export class AnnouncementWriterComponent {
    public icon = faFeatherAlt;

}