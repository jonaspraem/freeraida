import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.model";
import { LineService } from "../lines/line.service";
import { LineTransferModel } from "../lines/lineTransfer.model";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";

const background_image = require('../../images/licensed/iStock-01.jpg');
const profile_picture = require('../../images/default-skier.jpg');

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    private background_image = background_image;
    private profile_picture = profile_picture;
    profile: Profile;
    lines: LineTransferModel[];

    constructor(private profileService: ProfileService,
                private lineService: LineService,
                private route: ActivatedRoute,
                private flag_dictionary: FLAG_DICTIONARY,
                private color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let user_address = params['user'];
            this.profileService.getProfile(user_address.toString())
                .subscribe(
                    (profile: Profile) => {
                        this.profile = profile;
                    }
                );
            this.lineService.getLines(user_address.toString())
                .subscribe(
                    (lines: LineTransferModel[]) => {
                        this.lines = lines;
                    }
                );
        });
    }

}