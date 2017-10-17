import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    expanded: Boolean = false;

    constructor() {}

    ngOnInit() {
        this.expanded = false;
    }

    onExpand() {
        this.expanded = true;
    }

    onCollapse() {
        this.expanded = false;
    }

}
