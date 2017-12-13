import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { Profile } from "../profile.model";
import { ActivatedRoute } from "@angular/router";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    profile: Profile;
    flag_list: string[];

    constructor(private profile_service: ProfileService,
                private route: ActivatedRoute,
                private flag_dictionary: FLAG_DICTIONARY) {}

    ngOnInit(): void {
        this.flag_list = this.flag_dictionary.toList();


    }
}