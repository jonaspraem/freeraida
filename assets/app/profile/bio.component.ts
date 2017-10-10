import { Component, Input } from "@angular/core";
import { Profile } from "./profile.model";

@Component({
    selector: 'app-profile-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
})

export class BioComponent{
    @Input() profile: Profile;
    default_img : string = 'assets/resources/images/default-skier.jpg';

    getDefaultImageUrl() {
        return this.default_img;
    }

    hasImage() {
        if (this.profile) return (this.profile.img != null);
        else return false;
    }

}