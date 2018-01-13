import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../../objects/models/profile.model";
import { Router } from "@angular/router";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";

let twitter = require('../../../images/social/twitter.png');
let instagram = require('../../../images/social/instagram.png');

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    profile: Profile;
    flag_list: string[];
    isWelcome: boolean;
    control_address: FormControl = new FormControl(null , Validators.required);
    control_firstname: FormControl = new FormControl(null , Validators.required);
    control_surname: FormControl = new FormControl(null , Validators.required);

    // form
    form: FormGroup;
    form_address: string;
    form_firstname: string;
    form_surname: string;
    form_bio: string;
    form_representation: string;
    form_twitter: string;
    form_instagram: string;
    form_canActivate: boolean;

    // images
    twitter = twitter;
    instagram = instagram;


    constructor(private profile_service: ProfileService,
                public auth_service: AuthService,
                private router: Router,
                public flag_dictionary: FLAG_DICTIONARY,
                public color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            address: this.control_address,
            firstname: this.control_firstname,
            surname: this.control_surname
        });
        this.flag_list = this.flag_dictionary.toList();
        this.profile_service.getProfileWithToken()
            .subscribe(
                (data) => {
                    const profile = data.obj;
                    this.profile = Profile.fabricate(profile);
                    this.isWelcome = false;
                    this.form_canActivate = true;
                    console.log('isWelcome: '+this.isWelcome);
                    this.control_address.disable();
                    this.control_firstname.disable();
                    this.control_surname.disable();

                    this.form_firstname = profile.firstName;
                    this.form_surname = profile.lastName;
                    this.form_bio = profile.bio;
                    this.form_address = profile.user_address;
                    this.form_representation = profile.representation;
                    this.form_twitter = profile.social_twitter;
                    this.form_instagram = profile.social_instagram;
                },
                err => {
                    console.log(err);
                    this.isWelcome = true;
                    console.log('isWelcome: '+this.isWelcome);

                    this.form.valueChanges.subscribe(data => {
                        console.log('Form changes '+ data.address);
                        if (data.address == '') this.form_canActivate = false;
                        else this.profile_service.addressIsAvailable(data.address)
                            .subscribe(data => {
                                    console.log('result '+ data);
                                    this.form_canActivate = data.obj;
                                },
                                (err) =>{
                                    console.log('err '+ err);
                                    this.form_canActivate = false;
                                }
                            );
                    });
                }
            );
    }

    onSubmit() {
        let profile = new Profile(
            this.form_firstname + this.form_surname,
            this.form_address,
            this.form_bio,
            this.form_firstname,
            this.form_surname,
            this.form_representation,
            this.form_twitter,
            this.form_instagram
        );
        if (this.auth_service.isWelcome) {
            this.profile_service.createNewProfile(profile).subscribe((profile: Profile) => this.profile = profile);
            this.auth_service.isWelcome = false;
            this.router.navigate(['home/feed']);
        }
        else this.profile_service.submitSettings(profile).subscribe((profile: Profile) => this.profile = profile);
    }
}