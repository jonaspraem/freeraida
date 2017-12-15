import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../profile.model";
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
    control: FormControl = new FormControl(null , Validators.required);

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
                private auth_service: AuthService,
                private router: Router,
                private flag_dictionary: FLAG_DICTIONARY,
                private color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            address: this.control,
            firstname: new FormControl(null, Validators.required),
            surname: new FormControl(null, Validators.required)
        });
        this.flag_list = this.flag_dictionary.toList();
        this.profile_service.getProfileWithToken()
            .subscribe(
                (profile: Profile) => {
                    this.isWelcome = false;
                    this.form_canActivate = true;
                    console.log(JSON.stringify(profile));
                    console.log('isWelcome: '+this.isWelcome);
                    this.control.disable();
                    //this.form.setControl('address', new FormControl({value: userProfile.user_address, disabled: true}, Validators.required));
                    this.profile = profile;
                    this.form_firstname = profile.firstName;
                    this.form_surname = profile.lastName;
                    this.form_bio = profile.bio;
                    this.form_address = profile.user_address;
                    this.form_representation = profile.representation;
                    this.form_twitter = profile.social_twitter;
                    this.form_instagram = profile.social_instagram;


                    // this.form = new FormGroup({
                    //     address: new FormControl({value: userProfile.user_address, disabled: true}, Validators.required),
                    //     firstname: new FormControl(null, Validators.required),
                    //     surname: new FormControl(null, Validators.required)
                    // });
                },
                err => {
                    this.isWelcome = true;
                    console.log('isWelcome: '+this.isWelcome);
                    // this.form = new FormGroup({
                    //     address: new FormControl(null, Validators.required),
                    //     firstname: new FormControl(null, Validators.required),
                    //     surname: new FormControl(null, Validators.required)
                    // });

                    this.form.valueChanges.subscribe(data => {
                        console.log('Form changes '+ data.address);
                        if (data.address == '') this.form_canActivate = false;
                        else this.profile_service.addressIsAvailable(data.address)
                            .subscribe((result: boolean) => {
                                    console.log('result '+ result);
                                    this.form_canActivate = result;
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

    onSubmit(form: NgForm) {
        let profile = new Profile(
            this.form_firstname + this.form_surname,
            form.value.address,
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