import { Component } from "@angular/core";

const mockImage = require('../../../images/backgrounds/nevada-drawing.jpg');

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html'
})

export class ProfileCardComponent {
    public mockImage = mockImage;

}