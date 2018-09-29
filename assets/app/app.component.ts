import { Component, OnInit } from '@angular/core';
import './@styles/styles.scss';
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { Event, NavigationStart, Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    public isComponentApp: boolean;
    private nonAppUrls = ['/landing-page'];

    constructor(
        private router: Router
    ) {}
    // Bases
        // #141D2F

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if(event instanceof NavigationStart) {
                this.isComponentApp = !this.nonAppUrls.includes(event.url);
                console.log(this.isComponentApp);
            }
        });
        FLAG_DICTIONARY.initialize();
    }

}
