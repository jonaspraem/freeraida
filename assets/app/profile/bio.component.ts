import { Component, Input } from "@angular/core";
import { Profile } from "./profile.model";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-profile-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
})

export class BioComponent{
    @Input() profile: Profile;
    default_img : string = 'assets/resources/images/default-skier.jpg';

    constructor(private authService: AuthService) {}

    canFollow() {
        console.log(this.authService.activeUser.username + "profile "+this.profile.username);
        if (!this.profile.username) return false;
        if (!this.authService.isLoggedIn()) return false;
        if (this.authService.activeUser.username == this.profile.username) {
            return false;
        }
        return true;
    }

    isFollowing() {
        if (this.contains(this.profile.followers, this.authService.activeUser.username)) return true;
        else return false;
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