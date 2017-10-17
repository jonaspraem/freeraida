import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onExpand() {
        console.log('expand');
    }

}
