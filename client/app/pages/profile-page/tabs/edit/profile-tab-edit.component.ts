import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsernameValidator } from '../../../../shared/form-validators/UsernameValidator';
import { PasswordValidator } from '../../../../shared/form-validators/PasswordValidator';
import { IUserProfile } from "../../../../models/interfaces/types";
import { ProfilePageService } from "../../profile-page.service";
import signup_messages from "../../../landing-page/SignupValidationMessages";
import { FLAG_DICTIONARY } from "../../../../dictionary/flag-dictionary";

@Component({
    selector: 'app-profile-tab-edit',
    templateUrl: './profile-tab-edit.component.html'
})

export class ProfileTabEditComponent implements OnInit {
  public userProfile: IUserProfile;
  public messages;
  public countryList;
  public editProfileForm = new FormGroup(
    {
      username: new FormControl(
        {value: '', disabled: true},
        Validators.compose([
          UsernameValidator.validUsername,
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(2),
        ])
      ),
      firstname: new FormControl({value: '', disabled: true}, Validators.required),
      surname: new FormControl({value: '', disabled: true}, Validators.required),
      country: new FormControl('', Validators.required),
    }
  );

  constructor(private profilePageService: ProfilePageService) {}

  ngOnInit(): void {
    this.messages = signup_messages;
    this.countryList = FLAG_DICTIONARY.toList();

    this.profilePageService.activeUserProfile$.subscribe(profile => {
      if (!profile) {
        return;
      }

      this.userProfile = profile;
      console.log(profile);

      this.editProfileForm = new FormGroup(
        {
          username: new FormControl(
            {value: profile.username, disabled: true},
            Validators.compose([
              UsernameValidator.validUsername,
              Validators.required,
              Validators.maxLength(25),
              Validators.minLength(2),
            ])
          ),
          firstname: new FormControl({value: profile.firstname, disabled: true}, Validators.required),
          surname: new FormControl({value: profile.surname, disabled: true}, Validators.required),
          country: new FormControl(profile.country, Validators.required),
        }
      );
    });
  }
}