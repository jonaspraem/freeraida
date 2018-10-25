import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
})

export class FeedListComponent {
    @Input() posts: Post[];
    @Input() profile: Profile;

    deletePost(id: string) {
        for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].postId == id) this.posts.splice(i, 1);
        }
    }
}