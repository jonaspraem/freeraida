import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Material design
import { MatCardModule, MatButtonModule, MatInputModule } from "@angular/material";

import { PostService } from "./post.service";
import { UserActivityComponent } from "./user-activity/user-activity.component";
import { UserActivityListComponent } from "./user-activity/user-activity-list.component";
import { PostInputComponent } from "./post-input.component";
import { PostComponent } from "./post.component";
import { LiveFeedComponent } from "./feed/live-feed.component";
import { FeedListComponent } from "./feed/feed-list.component";
import { UserActivityInputComponent } from "./user-activity/user-activity-input.component";


@NgModule({
    declarations: [
        UserActivityComponent,
        UserActivityListComponent,
        UserActivityInputComponent,
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
        UserActivityComponent,
        UserActivityListComponent,
        PostComponent,
        PostInputComponent,
        LiveFeedComponent,
        FeedListComponent,
    ],
    providers: [ PostService ]
})

export class PostModule {

}