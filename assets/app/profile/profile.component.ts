import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from "./profile.service";
import { Profile } from "../objects/models/profile.model";
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
    isOwnProfile: boolean;
    isFollowing: boolean;
    profile: Profile;
    lines: LineTransferModel[];

    constructor(private profile_service: ProfileService,
                private lineService: LineService,
                private route: ActivatedRoute,
                private flag_dictionary: FLAG_DICTIONARY,
                private color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let user_address = params['user'];
            this.profile_service.getProfile(user_address.toString())
                .subscribe(
                    data => {
                        this.profile = Profile.fabricate(data.obj);
                        this.profile_service.getProfileWithToken()
                            .subscribe(data => {
                                let self = Profile.fabricate(data.obj);
                                this.isFollowing = (this.profile.followers.includes(self.user_address));
                                this.isOwnProfile = (self.user_address == user_address);
                            });
                    }
                );
            // this.lineService.getLines(user_address.toString())
            //     .subscribe(
            //         (lines: LineTransferModel[]) => {
            //             this.lines = lines;
            //         }
            //     );
        });
    }

}