import { Component, Input, OnInit } from '@angular/core';
import { Profile } from "../objects/models/profile.model";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    @Input() userProfile: any;
    @Input() profile: Profile;
    expanded: Boolean = true;

    constructor() {}

    ngOnInit() {
        this.expanded = true;
    }

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
