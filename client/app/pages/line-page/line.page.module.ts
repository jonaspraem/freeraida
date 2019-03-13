import { NgModule } from "@angular/core";
import { LinePageComponent } from "./line.page.component";
import { lineRoutes } from "./line.routing";
import { LineModule } from "../../components/line-module/line.module";

@NgModule({
    declarations: [
        LinePageComponent
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