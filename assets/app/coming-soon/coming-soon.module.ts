import { NgModule } from "@angular/core";
import { ForumsComponent } from "./forums/forums.component";
import { CommonModule } from "@angular/common";
import { BeginnersGuideComponent } from "./beginners-guide/beginners-guide.component";

@NgModule({
    declarations: [
        ForumsComponent,
        BeginnersGuideComponent
    ],
    imports: [
        CommonModule
    ]
})

export class ComingSoonModule {}