import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home.page.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { ProfileCardComponent } from "../../components/profile-card/profile-card.component";
import { PostModule } from "../../components/post-module/post.module";

@NgModule({
    declarations: [
        HomePageComponent,
        ProfileCardComponent,
    ],
    exports: [
        HomePageComponent
    ],
    entryComponents: [
        HomePageComponent
    ],
    imports: [
        FontAwesomeModule,
        CommonModule,
        PostModule
    ]
})

export class HomePageModule {}