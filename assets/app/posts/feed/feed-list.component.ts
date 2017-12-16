import { Component, OnInit } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { PostService } from "../post.service";
import { ProfileService } from "../../profile/profile.service";
import { Profile } from "../../objects/models/profile.model";

@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
})

export class FeedListComponent implements OnInit{
    posts: Post[];
    profile: Profile;

    constructor(private postService: PostService, private profile_service: ProfileService) {}

    ngOnInit(): void {
        this.postService.getFeed()
            .subscribe(
                data => {
                    console.log(data);
                    this.posts = Post.fabricateList(data.obj);
                }, err => {
                    console.log(err);
                }
            );
        this.profile_service.getProfileWithToken().subscribe(data => this.profile = Profile.fabricate(data.obj));
    }
}