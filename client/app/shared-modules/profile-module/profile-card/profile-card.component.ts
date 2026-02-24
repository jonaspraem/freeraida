import { Component, Input } from '@angular/core';
import { IUserProfile } from '../../../models/interfaces/types';

const mockImage = '/js/app/browser/images/backgrounds/nevada-drawing.jpg';
const defaultProfileImage = '/js/app/browser/images/rider/profile-image.jpg';

@Component({
  standalone: false,
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {
  @Input() user: IUserProfile;
  public mockImage = mockImage;
  public defaultProfileImage = defaultProfileImage;
}
