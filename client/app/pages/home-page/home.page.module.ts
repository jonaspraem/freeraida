import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home.page.component";
import { PostWriterComponent } from "../../features/post-writer/post-writer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        HomePageComponent,
        PostWriterComponent,
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