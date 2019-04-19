import { NgModule } from "@angular/core";
import { LinePageComponent } from "./line.page.component";
import { lineRoutes } from "./line.routing";
import { LineModule } from "../../components/line-module/line.module";
import { LineOverviewComponent } from "./components/line-overview/line-overview.component";
import { LineHeightMapComponent } from "./components/line-height-map/line-height-map.component";
import { CommonModule } from "@angular/common";
import { Ng2GoogleChartsModule } from "ng2-google-charts";

@NgModule({
    declarations: [
        LinePageComponent,
        LineOverviewComponent,
        LineHeightMapComponent
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
        CommonModule,
        Ng2GoogleChartsModule,
    ]
})

export class LinePageModule {
    
}