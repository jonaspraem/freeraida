import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionArrowLeftComponent } from "../components/arrows/action-arrow-left.component";
import { ArrowsModule } from "../components/arrows/arrows.module";

@NgModule({
    imports: [
        CommonModule,
        ArrowsModule,
    ],
    exports: [
        CommonModule,
        ArrowsModule
    ]
})

export class SharedModule {}