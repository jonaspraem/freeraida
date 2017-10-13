import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { PostService } from "./post.service";
import { ProfileFeedComponent } from "./profile-feed.component";
import { PostListComponent } from "./post-list.component";
import { PostInputComponent } from "./post-input.component";
import { PostComponent } from "./post.component";


@NgModule({
    declarations: [
        ProfileFeedComponent,
        PostListComponent,
        PostComponent,
        PostInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ProfileFeedComponent,
        PostListComponent,
        PostComponent,
        PostInputComponent
    ],
    providers: [ PostService ]
})

export class PostModule {

}