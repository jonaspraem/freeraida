import { NgModule } from "@angular/core";
import { LinePageComponent } from "./line.page.component";
import { lineRoutes } from "./line.routing";
import { LineModule } from "../../components/line-module/line.module";
import { LineOverviewComponent } from "./components/line-overview/line-overview.component";
import { LineHeightMapComponent } from "./components/line-height-map/line-height-map.component";

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
        LineModule
    ]
})

export class LinePageModule {
    
}