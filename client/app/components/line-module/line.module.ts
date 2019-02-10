import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { LineCreatorComponent } from "./line-creater/line-creater.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ChartsModule } from "ng2-charts";

@NgModule({
    declarations: [
        LineCreatorComponent
    ],
    exports: [
        LineCreatorComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM' // TODO Move
        }),
    ]
})

export class LineModule {}
