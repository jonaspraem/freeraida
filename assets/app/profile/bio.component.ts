import { Component, Input } from "@angular/core";
import { Profile } from "./profile.model";

@Component({
    selector: 'app-profile-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
})

export class BioComponent {
    @Input() profile: Profile;
    defaultImagePath: string;

    constructor() {
        this.defaultImagePath = 'assets/resources/default_profile_img.png';
    }

    hasImage() {
        if (this.profile) return (this.profile.img != null);
        else return false;
    }

}