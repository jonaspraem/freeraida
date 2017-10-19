import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    expanded: Boolean = true;
    content: String;

    constructor() {}

    ngOnInit() {
        this.expanded = true;
        this.content = 'dashboard';
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

    setContent(value: String) {
        this.content = value;
    }

    getContent() {
        return this.content;
    }



}
