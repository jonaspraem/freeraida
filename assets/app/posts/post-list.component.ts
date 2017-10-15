import { Component, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { ProfileService } from "../profile/profile.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
})

export class PostListComponent implements OnInit{
    posts: Post[];

    constructor(private postService: PostService, private profileService: ProfileService) {}

    ngOnInit(): void {
        // TODO: profile is not existing on manual routing
        if (this.profileService.profile) {
            this.postService.getPosts(this.profileService.profile.username)
                .subscribe(
                    (posts: Post[]) => {
                        this.posts = posts;
                    }
                );
        }
    }
}