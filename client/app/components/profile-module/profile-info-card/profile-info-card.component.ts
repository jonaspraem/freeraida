import { Component, Input } from "@angular/core";
import { IUserProfile } from "../../../models/interfaces/types";
import { FLAG_DICTIONARY } from "../../../dictionary/flag-dictionary";
import { SocialService } from "../../../core/services/social.service";
import { ProfileService } from "../../../core/services/profile.service";

@Component({
    selector: 'app-profile-info-card',
    templateUrl: './profile-info-card.component.html'
})

export class ProfileInfoCardComponent {
    @Input() userProfile: IUserProfile;
    @Input() isFollowing: boolean;
    public isSelf: boolean;

    constructor(
        private _socialService: SocialService,
        private _authService: ProfileService,
        public flagDictionary: FLAG_DICTIONARY,
    ) {}

    public onToggle(): void {
        this._authService.userProfile$.subscribe(profile => this.isSelf = profile._id === this.userProfile._id);
        this.isFollowing ?
            this._socialService.unfollowUser(this.userProfile.username)
            :
            this._socialService.followUser(this.userProfile.username)
    }
}