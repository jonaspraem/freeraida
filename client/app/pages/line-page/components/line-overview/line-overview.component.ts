import { Component, Input, OnInit, Output } from "@angular/core";
import { ILine } from "../../../../models/interfaces/types";
import { COLOR_DICTIONARY } from "../../../../dictionary/color-dictionary";
import { ProfileService } from "../../../../core/services/profile.service";

@Component({
    selector: 'app-line-overview',
    templateUrl: './line-overview.component.html'
})

export class LineOverviewComponent implements OnInit {
    @Input() line: ILine;
    public isOwn: boolean = false;

    constructor(
        public colorDictionary: COLOR_DICTIONARY,
        public profileService: ProfileService
    ) {}

    public ngOnInit(): void {
        this.profileService.userProfile$.subscribe(profile => {
            this.isOwn = this.line.username === profile.username;
        });
    }
}