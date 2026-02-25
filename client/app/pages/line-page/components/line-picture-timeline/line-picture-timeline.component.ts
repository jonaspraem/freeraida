import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ILine, ILineLocation } from '../../../../models/interfaces/types';

@Component({
  standalone: false,
  selector: 'app-line-picture-timeline',
  templateUrl: './line-picture-timeline.component.html',
})
export class LinePictureTimelineComponent implements OnInit {
  @Input() line: ILine;
  @ViewChild('image') imageElement: ElementRef;
  public imageAttachedLocations: ILineLocation[];
  public activeImageUrl: string;
  public currentIndex: number = 0;
  // For looping the images
  public locationIndex: number = 0;
  private imageOnLocationIndex: number = 0;
  private imageCount: number = 0;

  public ngOnInit(): void {
    this.imageAttachedLocations = this.line.locations.filter((loc) => Array.isArray(loc.images));
    this.imageAttachedLocations.map((loc) => (this.imageCount += loc.images.length));
    this.activeImageUrl = this.imageAttachedLocations[0].images[0];
    setInterval(() => {
      this.toggleImage();
    }, 5000);
  }

  public percentOnRoute(location: ILineLocation): number {
    return (location.distanceFromStart / this.line.endLocation.distanceFromStart) * 100;
  }

  private toggleImage(): void {
    this.currentIndex++;
    if (this.currentIndex === this.imageCount) {
      this.currentIndex = 0;
      this.locationIndex = 0;
      this.imageOnLocationIndex = 0;
    }
    if (this.currentIndex === 0) {
      // do nothing
    } else if (!this.imageAttachedLocations[this.locationIndex].images[this.imageOnLocationIndex + 1]) {
      this.locationIndex++;
      this.imageOnLocationIndex = 0;
    } else {
      this.imageOnLocationIndex++;
    }

    // Set image element
    this.imageElement.nativeElement.className = 'photo-timeline__image photo-timeline__image--fade-out';
    this.delay(1000).then(() => {
      this.activeImageUrl = this.imageAttachedLocations[this.locationIndex].images[this.imageOnLocationIndex];
      this.imageElement.nativeElement.className = 'photo-timeline__image';
      return;
    });
  }

  async delay(ms: number) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }
}
