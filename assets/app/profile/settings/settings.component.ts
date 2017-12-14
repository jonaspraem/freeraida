import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../profile.model";
import { ActivatedRoute } from "@angular/router";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

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


    constructor(private profile_service: ProfileService,
                private route: ActivatedRoute,
                private flag_dictionary: FLAG_DICTIONARY) {}

    ngOnInit(): void {
        this.flag_list = this.flag_dictionary.toList();
        this.profile_service.getProfileWithToken()
            .subscribe(
                (profile: Profile) => {
                    this.profile = profile;
                    this.form_firstname = profile.firstName;
                    this.form_surname = profile.lastName;
                    this.form_bio = profile.bio;
                }
        );
        this.form = new FormGroup({
            address: new FormControl(null, Validators.required)
        });
    }

    onSubmit(form: NgForm) {
        let profile = new Profile(
            form.value.firstname + form.value.surname,
            form.value.address,
            form.value.bio,
            form.value.firstname,
            form.value.surname,
            form.value.representation
        );
        this.profile_service.submitSettings(profile);
    }
}