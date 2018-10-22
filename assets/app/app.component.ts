import { Component, OnInit } from '@angular/core';
import '../styles/styles.scss';
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { Event, NavigationStart, Router } from "@angular/router";
import { ProfileService } from "./core/services/profile.service";
import { routerTransition } from "./shared/animations/router-transition.animation";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [routerTransition]
})
export class AppComponent implements OnInit {
    public isComponentApp: boolean;
    private nonAppUrls = ['/landing-page'];

    constructor(
        private router: Router,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if(event instanceof NavigationStart) {
                this.isComponentApp = !this.nonAppUrls.includes(event.url);
            }
        });
        this.profileService.getProfileWithToken();
        FLAG_DICTIONARY.initialize();
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
