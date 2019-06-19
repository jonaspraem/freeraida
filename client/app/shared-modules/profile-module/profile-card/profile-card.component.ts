import { Component, Input } from "@angular/core";
import { IUserProfile } from "../../../models/interfaces/types";

const mockImage = require('../../../../images/backgrounds/nevada-drawing.jpg');
const defaultProfileImage = require('../../../../images/rider/profile-image.jpg');

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html'
})

export class ProfileCardComponent {
    @Input() user: IUserProfile;
    public mockImage = mockImage;
    public defaultProfileImage = defaultProfileImage;
}