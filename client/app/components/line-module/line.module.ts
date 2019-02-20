import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { LineCreatorPageComponent } from "../../pages/line-creater-page/line-creater.page.component";
import { HeightMapComponent } from "./height-map/height-map.component";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { MatIconModule, MatListModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LineCreatorPageComponent,
        HeightMapComponent
    ],
    exports: [
        LineCreatorPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        Ng2GoogleChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM' // TODO Move
        }),
        MatListModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class LineModule {}
