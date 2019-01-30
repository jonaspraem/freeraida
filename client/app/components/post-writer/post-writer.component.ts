import { Component, ElementRef, ViewChild } from "@angular/core";
import { faFeatherAlt} from "@fortawesome/free-solid-svg-icons";

const defaultImage = require('../../../images/rider/profile-image.jpg');

@Component({
    host: {
        '(document:click)': 'onClick($event)',
    },
    selector: 'app-post-writer',
    templateUrl: './post-writer.component.html'
})

export class PostWriterComponent {
    @ViewChild('writerContainer') writerContainer: ElementRef;
    @ViewChild('writer') writer: ElementRef;
    public defaultImage = defaultImage;
    public icon = faFeatherAlt;
    public userInput: string = '';

    constructor(
        private _elRef: ElementRef,
    ) {}

    public expand(): void {
        this.writerContainer.nativeElement.className = 'post-writer post-writer--open';
    }

    public close(): void {
        this.writerContainer.nativeElement.className = 'post-writer';
    }

    // On click outside component
    onClick(event) {
        if (!this._elRef.nativeElement.contains(event.target) && this.userInput.length < 1) {
            this.close();
        }
    }

}