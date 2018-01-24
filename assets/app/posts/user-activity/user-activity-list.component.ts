import { Component, Input, OnInit } from "@angular/core";

import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-user-activity-list',
    templateUrl: './user-activity-list.component.html',
    styleUrls: ['./user-activity-list.component.css']
})

export class UserActivityListComponent {
    @Input() profile: Profile;
    @Input() posts: Post[];

    deletePost(id: string) {
        for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].postId == id) this.posts.splice(i, 1);
        }
    }
}