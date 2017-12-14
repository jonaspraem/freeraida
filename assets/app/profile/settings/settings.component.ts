import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../profile.model";
import { ActivatedRoute } from "@angular/router";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

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

    // form
    form: FormGroup;
    form_address: string;
    form_firstname: string;
    form_surname: string;
    form_bio: string;
    form_representation: string;
    form_twitter: string;
    form_instagram: string;

    // images
    twitter = twitter;
    instagram = instagram;


    constructor(private profile_service: ProfileService,
                private route: ActivatedRoute,
                private flag_dictionary: FLAG_DICTIONARY) {}

    ngOnInit(): void {
        this.flag_list = this.flag_dictionary.toList();
        this.profile_service.getProfileWithToken()
            .subscribe(
                (profile: Profile) => {
                    if (profile.user_address) {

                    }
                    this.profile = profile;
                    this.form_firstname = profile.firstName;
                    this.form_surname = profile.lastName;
                    this.form_bio = profile.bio;
                    this.form_address = profile.user_address;
                }
        );
        this.form = new FormGroup({
            address: new FormControl(null, Validators.required)
        });
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
        this.profile_service.submitSettings(profile);
    }
}