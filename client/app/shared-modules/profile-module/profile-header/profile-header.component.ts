import { Component, Input } from "@angular/core";
import { IUserProfile } from "../../../models/interfaces/types";
import { FLAG_DICTIONARY } from "../../../dictionary/flag-dictionary";

const image = require('../../../../images/rider/profile-image.jpg');

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html'
})

export class ProfileHeaderComponent {
    @Input() readonly profile: IUserProfile;
    public image = image;

    public getFlag(key: string) {
        return FLAG_DICTIONARY.get(key);
    }
}