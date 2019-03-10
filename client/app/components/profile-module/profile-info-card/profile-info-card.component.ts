import { Component, Input } from "@angular/core";
import { IUserProfile } from "../../../models/interfaces/types";
import { FLAG_DICTIONARY } from "../../../dictionary/flag-dictionary";
import { ProfileService } from "../../../core/services/profile.service";

@Component({
    selector: 'app-profile-info-card',
    templateUrl: './profile-info-card.component.html'
})

export class ProfileInfoCardComponent {
    @Input() userProfile: IUserProfile;
    @Input() isFollowing: boolean;

    constructor(
        private _profileService: ProfileService,
        public flagDictionary: FLAG_DICTIONARY,
    ) {}

    public onToggle(): void {
        this.isFollowing ?
            this._profileService.unfollowUser(this.userProfile.username)
            :
            this._profileService.followUser(this.userProfile.username)
    }
}