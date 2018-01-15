import { NgModule } from "@angular/core";
import { TrackPageComponent } from "./track-page.component";
import { MatCardModule } from "@angular/material";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        TrackPageComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
    ]
})

export class TrackPageModule {}