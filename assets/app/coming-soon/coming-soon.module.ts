import { NgModule } from "@angular/core";
import { ForumsComponent } from "./forums/forums.component";
import { CommonModule } from "@angular/common";
import { BeginnersGuideComponent } from "./beginners-guide/beginners-guide.component";
import { EventsComponent } from "./events/events.component";
import { WikiComponent } from "./wiki/wiki.component";

@NgModule({
    declarations: [
        ForumsComponent,
        BeginnersGuideComponent,
        EventsComponent,
        WikiComponent
    ],
    imports: [
        CommonModule
    ]
})

export class ComingSoonModule {}