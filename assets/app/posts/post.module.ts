import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Material design
import { MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatMenuModule } from "@angular/material";

import { AnnouncementService } from "../@core/services/announcement.service";
import { UserActivityComponent } from "./user-activity/user-activity.component";
import { UserActivityListComponent } from "./user-activity/user-activity-list.component";
import { PostInputComponent } from "./feed/feed-input.component";
import { PostComponent } from "./post.component";
import { LiveFeedComponent } from "./feed/live-feed.component";
import { FeedListComponent } from "./feed/feed-list.component";
import { UserActivityInputComponent } from "./user-activity/user-activity-input.component";
import { MentionModule } from "angular2-mentions/mention";


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
        MentionModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [
        UserActivityComponent,
        UserActivityListComponent,
        PostComponent,
        PostInputComponent,
        LiveFeedComponent,
        FeedListComponent,
    ],
    providers: [ AnnouncementService ]
})

export class PostModule {

}