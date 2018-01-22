import { Component, Input, OnInit } from '@angular/core';
import { Profile } from "../objects/models/profile.model";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
    @Input() userProfile: any;
    @Input() profile: Profile;
    expanded: Boolean = false; // Starts expanded or not

    constructor(public color_dictionary: COLOR_DICTIONARY) {}

    onExpand() {
        this.expanded = true;
    }

    onCollapse() {
        this.expanded = false;
    }

    isExpanded() {
        return this.expanded;
    }
}
