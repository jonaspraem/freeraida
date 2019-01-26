import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home.page.component";
import { PostWriterComponent } from "../../components/post-writer/post-writer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { ProfileCardComponent } from "../../components/profile-card/profile-card.component";
import { PostLoaderComponent } from "../../components/post-loader/post-loader.component";

@NgModule({
    declarations: [
        HomePageComponent,
        PostWriterComponent,
        ProfileCardComponent,
        PostLoaderComponent
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