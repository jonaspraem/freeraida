import { Component, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { Profile } from "../profile/profile.model";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "./post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
})

export class PostListComponent implements OnInit{
    posts: Post[];

    constructor(private postService: PostService, private route: ActivatedRoute) {}

    // TODO: parse from profile.component
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            var username = params['user'];
            this.postService.getPosts(username.toString())
                .subscribe(
                    (posts: Post[]) => {
                        this.posts = posts;
                    }
                );
        });
    }
}