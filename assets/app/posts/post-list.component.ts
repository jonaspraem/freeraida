import { Component, Input, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { Profile } from "../profile/profile.model";
import { PostService } from "./post.service";
import { ProfileService } from "../profile/profile.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
})

export class PostListComponent implements OnInit{
    @Input() profile: Profile;
    posts: Post[];

    constructor(private postService: PostService, private profileService: ProfileService) {}

    ngOnInit(): void {
        if (this.profileService.profile) {
            console.log('received profile: '+this.profileService.profile.username);
            this.postService.getPosts(this.profileService.profile.username)
                .subscribe(
                    (posts: Post[]) => {
                        console.log(posts);
                        this.posts = posts;
                    }
                );
        }
    }
}