import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ChartsModule } from "ng2-charts";
import { LineCreatorPageComponent } from "../../pages/line-creater-page/line-creater.page.component";

@NgModule({
    declarations: [
        LineCreatorPageComponent
    ],
    exports: [
        LineCreatorPageComponent
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
