import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { AnnouncementWriterComponent } from "../../@features/announcement-writer/announcement-writer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        HomePageComponent,
        AnnouncementWriterComponent,
    ],
    exports: [
        HomePageComponent
    ],
    entryComponents: [
        HomePageComponent
    ],
    imports: [
        FontAwesomeModule,
    ]
})

export class HomePageModule {}