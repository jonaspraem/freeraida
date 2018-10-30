import { Component, Input } from "@angular/core";
import { IUserProfile } from "../../models/interfaces/types";

const image = require('../../../images/rider/profile-image.jpg');

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html'
})

export class ProfileHeaderComponent {
    @Input() readonly profile: IUserProfile;
    public image = image;
}