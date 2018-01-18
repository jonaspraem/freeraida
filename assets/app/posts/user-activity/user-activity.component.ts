import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-user-activity',
    templateUrl: './user-activity.component.html',
    styleUrls: ['./user-activity.component.css']
})

export class UserActivityComponent {
    @Input() profile: Profile;
    @Input() posts: Post[];

    constructor(private post_service: PostService,
                private route: ActivatedRoute) {}


}