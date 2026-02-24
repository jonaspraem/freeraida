import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserProfile } from '../../../models/interfaces/types';
import { FLAG_DICTIONARY } from '../../../dictionary/flag-dictionary';

@Component({
  standalone: false,
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
})
export class ProfileInfoCardComponent {
  @Input() userProfile: IUserProfile;
  @Input() isWaiting: boolean = false;
  @Output() toggleFollow = new EventEmitter<void>();

  constructor(public flagDictionary: FLAG_DICTIONARY) {}

  public onToggle(): void {
    if (this.isWaiting) {
      return;
    }
    this.toggleFollow.emit();
  }
}
