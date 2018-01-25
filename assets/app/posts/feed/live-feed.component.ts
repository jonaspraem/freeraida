import { Component } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
import { PostService } from "../post.service";
import { ProfileService } from "../../profile/profile.service";

@Component({
    selector: 'app-feed',
    templateUrl: './live-feed.component.html'
})

export class LiveFeedComponent {
    instance: LiveFeedComponent;
    posts: Post[];
    profile: Profile;
    mentions: string[];

    constructor(private post_service: PostService,
                private profile_service: ProfileService) {
        this.instance = this;
    }

    ngOnInit(): void {
        this.post_service.getUsers().subscribe(data =>{
            this.mentions = [];
            for (let i = 0; i < data.obj.length; i++) {
                this.mentions.push(data.obj[i].user_address);
            }
        });
        this.post_service.getFeed().subscribe(data => this.posts = Post.fabricateList(data.obj));
        this.profile_service.getProfileWithToken().subscribe(data => this.profile = Profile.fabricate(data.obj));
    }
}