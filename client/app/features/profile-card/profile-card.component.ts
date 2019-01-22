import { Component, Input } from "@angular/core";
import { IUserProfile } from "../../models/interfaces/types";

const mockImage = require('../../../images/backgrounds/nevada-drawing.jpg');
const defaultProfileImage = require('../../../images/rider/default-image.png');

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html'
})

export class ProfileCardComponent {
    @Input() userProfile: IUserProfile;
    public mockImage = mockImage;
    public defaultProfileImage = defaultProfileImage;
}