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

export class UserActivityComponent implements OnInit {
     @Input() profile: Profile;
    posts: Post[];

    constructor(private post_service: PostService,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let user_address = params['user'];
            this.post_service.getPosts(user_address.toString())
                .subscribe(
                    data => {
                        this.posts = Post.fabricateList(data.obj);
                    }
                );
        });
    }
}