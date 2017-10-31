import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.model";
import { LineService } from "../lines/line.service";
import { LineTransferModel } from "../lines/lineTransfer.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    profile: Profile;
    lines: LineTransferModel[];

    constructor(private profileService: ProfileService, private lineService: LineService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let username = params['user'];
            this.profileService.getProfile(username.toString())
                .subscribe(
                    (profile: Profile) => {
                        this.profile = profile;
                    }
                );
            this.lineService.getLines(username.toString())
                .subscribe(
                    (lines: LineTransferModel[]) => {
                        this.lines = lines;
                    }
                );
        });
    }

}