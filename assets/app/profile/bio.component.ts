import { Component, Input } from "@angular/core";
import { Profile } from "./profile.model";
import { AuthService } from "../auth/auth.service";
import { ProfileService } from "./profile.service";

@Component({
    selector: 'app-profile-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
})

export class BioComponent{
    @Input() profile: Profile;
    default_img : string = 'assets/resources/images/default-skier.jpg';

    constructor(private authService: AuthService, private profileService: ProfileService) {}

    follow() {
        console.log('follow '+this.profile.username);
        this.profileService.followUser(this.profile.username);
    }

    unfollow() {
        console.log('unfollow '+this.profile.username);
        this.profileService.unfollowUser(this.profile.username);
    }

    canFollow() {
        if (this.profile) {
            if (this.profile.username) {
                if (this.authService.isLoggedIn()) {
                    if (localStorage.getItem('username') != this.profile.username) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isFollowing() {
        if (this.profile) {
            if (this.profile.followers) {
                if (this.contains(this.profile.followers, localStorage.getItem('username').toString())) return true;
            }
        }
        return false;
    }

    getDefaultImageUrl() {
        return this.default_img;
    }

    hasImage() {
        if (this.profile) return (this.profile.img != null);
        else return false;
    }

    contains(arr, element) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === element) {
                return true;
            }
        }
        return false;
    }

}