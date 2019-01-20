import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home.page.component";
import { PostWriterComponent } from "../../features/post-writer/post-writer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { ProfileCardComponent } from "../../features/profile-card/profile-card.component";

@NgModule({
    declarations: [
        HomePageComponent,
        PostWriterComponent,
        ProfileCardComponent
    ],
    exports: [
        HomePageComponent
    ],
    entryComponents: [
        HomePageComponent
    ],
    imports: [
        FontAwesomeModule,
        CommonModule
    ]
})

export class HomePageModule {}