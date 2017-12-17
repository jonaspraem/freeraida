import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { PostService } from "../post.service";
import { ProfileService } from "../../profile/profile.service";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
})

export class FeedListComponent {
    @Input() posts: Post[];
    @Input() profile: Profile;
}