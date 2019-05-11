import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ILine, ILineLocation } from "../../../../models/interfaces/types";

@Component({
    selector: 'app-line-picture-timeline',
    templateUrl: './line-picture-timeline.component.html'
})

export class LinePictureTimelineComponent implements OnInit {
    @Input() line: ILine;
    @ViewChild('image') imageElement: ElementRef;
    public imageAttachedLocations: ILineLocation[];
    public activeImageUrl: string;
    public currentIndex: number = 0;
    public locationIndex: number = 0;
    private imageCount: number = 0;

    public ngOnInit(): void {
        this.imageAttachedLocations = this.line.locations.filter(loc => Array.isArray(loc.images));
        this.imageAttachedLocations.map(loc => this.imageCount += loc.images.length);
        this.activeImageUrl = this.imageAttachedLocations[0].images[0];
        setInterval(() => {
            this.toggleImage();
        }, 5000);
    }

    public percentOnRoute(location: ILineLocation): number {
        return location.distanceFromStart / this.line.endLocation.distanceFromStart * 100;
    }

    private toggleImage(): void {
        if (this.currentIndex === this.imageCount) {
            this.currentIndex = 0;
            this.locationIndex = 0;
        }
        let counter = 0;
        for(let i = 0; i < this.imageAttachedLocations.length; i++) {
            let location = this.imageAttachedLocations[i];

            for (let j = 0; j < location.images.length; j++) {
                let image = location.images[j];
                let isLast: boolean = !location.images[j + 1];
                if (counter === this.currentIndex) {
                    this.imageElement.nativeElement.className = 'photo-timeline__image photo-timeline__image--fade-out';
                    this.delay(1000).then(() => {
                        this.activeImageUrl = image;
                        this.currentIndex++;
                        this.imageElement.nativeElement.className = 'photo-timeline__image';

                        if (isLast) {
                            this.locationIndex++;
                        }
                        console.log(isLast, this.locationIndex, this.currentIndex);
                        return;
                    });
                }
                counter++;
            }
        }
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(()=>resolve(), ms));
    }
}