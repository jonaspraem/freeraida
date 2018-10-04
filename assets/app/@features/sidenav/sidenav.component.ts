import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html'
})

export class SidenavComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('made it here');
    }
}