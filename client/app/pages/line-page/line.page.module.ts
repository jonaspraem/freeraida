import { NgModule } from "@angular/core";
import { LinePageComponent } from "./line.page.component";
import { lineRoutes } from "./line.routing";
import { LineModule } from "../../components/line-module/line.module";
import { LineOverviewComponent } from "./components/line-overview/line-overview.component";
import { LineHeightMapComponent } from "./components/line-height-map/line-height-map.component";
import { CommonModule } from "@angular/common";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { LinePictureTimelineComponent } from "./components/line-picture-timeline/line-picture-timeline.component";
import { ArrowsModule } from "../../components/arrows/arrows.module";
import { LineEditOverlayComponent } from "./components/line-edit-overlay/line-edit-overlay.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LinePageComponent,
        LineOverviewComponent,
        LineHeightMapComponent,
        LinePictureTimelineComponent,
        LineEditOverlayComponent
    ],
    entryComponents: [
        LinePageComponent
    ],
    exports: [
        LinePageComponent
    ],
    imports: [
        lineRoutes,
        LineModule,
        ArrowsModule,
        CommonModule,
        Ng2GoogleChartsModule,
        FormsModule,
    ]
})

export class LinePageModule {
    
}