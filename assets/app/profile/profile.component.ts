import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileService } from "./profile.service";
import { Profile } from "../objects/models/profile.model";
import { LineService } from "../lines/line.service";
import { Line } from "../objects/models/line.model";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { AnnouncementService } from "../@core/services/announcement.service";
import { Post } from "../objects/models/post.model";

const background_image = require('../../images/licensed/iStock-01.jpg');
const profile_picture = require('../../images/default-skier.jpg');

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    public background_image = background_image;
    public profile_picture = profile_picture;
    isOwnProfile: boolean;
    self: Profile;
    profile: Profile;
    posts: Post[];
    lines: Line[];

    constructor(private profile_service: ProfileService,
                private line_service: LineService,
                private post_service: AnnouncementService,
                private router: Router,
                private route: ActivatedRoute,
                public flag_dictionary: FLAG_DICTIONARY,
                public color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.profile_service.getProfile(params['id']).subscribe(data => {
                console.log(data);
                this.profile = Profile.fabricate(data.obj);
                this.profile_service.getProfileWithToken()
                    .subscribe(data => {
                        this.self = Profile.fabricate(data.obj);
                        this.isOwnProfile = (this.self.user_address == this.profile.user_address);
                    });
            });
            this.post_service.getPosts(params['id']).subscribe(data => {
                this.posts = Post.fabricateList(data.obj);
            });
        });

    }

    isFollowing(): boolean {
        if (this.profile && this.self) {
            return (this.profile.followers.includes(this.self.user_address));
        } else return false;
    }

    follow() {
        this.profile_service.followUser(this.profile.user_address).subscribe(data => this.profile = Profile.fabricate(data.obj));
    }

    unfollow() {
        this.profile_service.unfollowUser(this.profile.user_address).subscribe(data => this.profile = Profile.fabricate(data.obj));
    }

    onAddressClick() {

    }

}