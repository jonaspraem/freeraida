import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UsernameValidator } from '../../../../shared/form-validators/UsernameValidator';
import { IUserProfile } from '../../../../models/interfaces/types';
import { ProfilePageService } from '../../profile-page.service';
import signup_messages from '../../../landing-page/SignupValidationMessages';
import { FLAG_DICTIONARY } from '../../../../dictionary/flag-dictionary';

@Component({
  standalone: false,
  selector: 'app-profile-tab-edit',
  templateUrl: './profile-tab-edit.component.html',
})
export class ProfileTabEditComponent implements OnInit, OnDestroy {
  public userProfile: IUserProfile;
  public messages;
  public countryList;
  private readonly _destroy$ = new Subject<void>();
  public editProfileForm = new FormGroup({
    username: new FormControl(
      { value: '', disabled: true },
      Validators.compose([
        UsernameValidator.validUsername,
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2),
      ])
    ),
    firstname: new FormControl({ value: '', disabled: true }, Validators.required),
    surname: new FormControl({ value: '', disabled: true }, Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(private profilePageService: ProfilePageService) {}

  ngOnInit(): void {
    this.messages = signup_messages;
    this.countryList = FLAG_DICTIONARY.toList();

    this.profilePageService.activeUserProfile$
      .pipe(
        filter((profile): profile is IUserProfile => !!profile),
        takeUntil(this._destroy$)
      )
      .subscribe((profile) => {
        this.userProfile = profile;
        this.editProfileForm.patchValue({
          username: profile.username,
          firstname: profile.firstname,
          surname: profile.surname,
          country: profile.country || '',
        });
      });
  }

  onSignup(): void {
    // TODO: wire profile update endpoint during follow-up cleanup.
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
