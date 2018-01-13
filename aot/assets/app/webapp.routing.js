import { RouterModule } from "@angular/router";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterRideComponent } from "./lines/register-ride.component";
import { ProfileComponent } from "./profile/profile.component";
import { TrackPageComponent } from "./tracker/track-page.component";
import { SettingsComponent } from "./profile/settings/settings.component";
var ɵ0 = { requiresLogin: true };
var WEBAPP_ROUTES = [
    // { path: '**', redirectTo: 'feed', pathMatch: 'full'},
    { path: 'feed', component: LiveFeedComponent },
    { path: 'ride-center', component: RegisterRideComponent },
    { path: 'track', component: TrackPageComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'user', component: ProfileComponent, data: ɵ0 },
];
export var webappRouting = RouterModule.forChild(WEBAPP_ROUTES);
export { ɵ0 };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/webapp.routing.js.map