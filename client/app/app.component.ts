import { Component, OnInit } from '@angular/core';
import '../styles/styles.scss';
import { FLAG_DICTIONARY } from './dictionary/flag-dictionary';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { routerTransition } from './shared/animations/router-transition.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routerTransition],
})
export class AppComponent implements OnInit {
  public isComponentApp: boolean;
  private nonAppUrls = ['/landing-page'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isComponentApp = !(this.nonAppUrls.indexOf(event.url) > -1);
      }
      if (event instanceof NavigationEnd) {
        // Scroll to top on route change
        if (event.url.startsWith('/user/') && event.urlAfterRedirects.startsWith('/user/')) {
          // Exceptions
          return;
        }
        window.scrollTo(0, 0);
      }
    });
    FLAG_DICTIONARY.initialize();
    // this.profileService.getProfileWithToken();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
