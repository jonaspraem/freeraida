import { NgModule } from "@angular/core";
import { TrackPageComponent } from "./track.component";
import { MatCardModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { TrackService } from "./track.service";

@NgModule({
    declarations: [
        TrackPageComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
    ],
    providers: [
        TrackService
    ]
})

export class TrackPageModule {}