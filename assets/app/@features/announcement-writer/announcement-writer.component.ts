import { Component, ElementRef, ViewChild } from "@angular/core";
import { faFeatherAlt} from "@fortawesome/free-solid-svg-icons";

const default_image = require('../../../images/rider/default-image.png');

@Component({
    selector: 'app-announcement-writer',
    templateUrl: './announcement-writer.component.html'
})

export class AnnouncementWriterComponent {
    @ViewChild('writerContainer') writerContainer: ElementRef;
    @ViewChild('writer') writer: ElementRef;
    public defaultImage = default_image;
    public icon = faFeatherAlt;

    public expand(): void {
        this.writerContainer.nativeElement.className = 'announcement-writer announcement-writer_open';
        this.writer.nativeElement.className = 'announcement-writer__textwriter announcement-writer__textwriter_open';
    }

}