import { Component } from "@angular/core";
import { Post } from "../../objects/models/post.model";
import { Profile } from "../../objects/models/profile.model";
import { PostService } from "../../../core/services/post.service";
import { ProfileService } from "../../../core/services/profile.service";
import { Subscription } from "rxjs/Subscription";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { LineLocation } from "../../objects/models/line-location.model";

@Component({
    selector: 'app-feed',
    templateUrl: './live-feed.component.html'
})

export class LiveFeedComponent {
    instance: LiveFeedComponent;
    posts: Post[];
    profile: Profile;
    mentions: string[];

    private subscription_ticker: Subscription;

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
        // Setting update ticker
        let ticker = TimerObservable.create(120000, 120000);
        this.subscription_ticker = ticker.subscribe((t) => this.onTimeOut(t));
    }

    // Update feed every tick
    onTimeOut(data) {
        console.log('Updating feed...');
        this.post_service.getFeed().subscribe(data => this.posts = Post.fabricateList(data.obj));
    }
}