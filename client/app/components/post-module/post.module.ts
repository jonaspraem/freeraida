import { NgModule } from "@angular/core";
import { PostWriterComponent } from "./post-writer/post-writer.component";
import { PostLoaderComponent } from "./post-loader/post-loader.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post.component";

@NgModule({
    declarations: [
        PostWriterComponent,
        PostLoaderComponent,
        PostComponent,
    ],
    exports: [
        PostWriterComponent,
        PostLoaderComponent,
        PostComponent,
    ],
    imports: [
        FontAwesomeModule,
        CommonModule
    ]
})

export class PostModule {}