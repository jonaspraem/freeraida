import { Component, Input } from "@angular/core";
import { Profile } from "../profile/profile.model";

@Component({
    selector: 'app-profile-feed',
    templateUrl: './profile-feed.component.html'
})

export class ProfileFeedComponent {
    @Input() profile: Profile;

}