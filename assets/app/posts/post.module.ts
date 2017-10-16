import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Material design
import { MatCardModule, MatButtonModule, MatInputModule } from "@angular/material";

import { PostService } from "./post.service";
import { ProfileFeedComponent } from "./profile-feed.component";
import { PostListComponent } from "./post-list.component";
import { PostInputComponent } from "./post-input.component";
import { PostComponent } from "./post.component";
import { LiveFeedComponent } from "./feed/live-feed.component";
import { FeedListComponent } from "./feed/feed-list.component";


@NgModule({
    declarations: [
        ProfileFeedComponent,
        PostListComponent,
        PostComponent,
        PostInputComponent,
        LiveFeedComponent,
        FeedListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule
    ],
    exports: [
        ProfileFeedComponent,
        PostListComponent,
        PostComponent,
        PostInputComponent,
        LiveFeedComponent,
        FeedListComponent,
    ],
    providers: [ PostService ]
})

export class PostModule {

}