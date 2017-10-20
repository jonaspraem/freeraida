import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
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
