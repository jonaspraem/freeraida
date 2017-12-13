import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
    selector: 'app-user-activity-list',
    templateUrl: './user-activity-list.component.html',
    styleUrls: ['./user-activity-list.component.css']
})

export class UserActivityListComponent implements OnInit {
    posts: Post[];

    constructor(private postService: PostService,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let user_address = params['user'];
            this.postService.getPosts(user_address.toString())
                .subscribe(
                    (activities: Post[]) => {
                        this.posts = activities;
                    }
                );
        });
    }
}