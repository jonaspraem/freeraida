import { Component, Input } from "@angular/core";
import { IProfileRelativeInfo, IUserProfile } from "../../../models/interfaces/types";
import { FLAG_DICTIONARY } from "../../../dictionary/flag-dictionary";
import { SocialService } from "../../../core/services/social.service";

@Component({
    selector: 'app-profile-info-card',
    templateUrl: './profile-info-card.component.html'
})

export class ProfileInfoCardComponent {
    @Input() userProfile: IUserProfile;
    constructor(
        private _socialService: SocialService,
        public flagDictionary: FLAG_DICTIONARY,
    ) {}

    public onToggle(): void {
        this.userProfile.isFollowing ?
            this._socialService.unfollowUser(this.userProfile.username)
            :
            this._socialService.followUser(this.userProfile.username)
    }
}