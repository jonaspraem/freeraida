import { RouterModule } from "@angular/router";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterRideComponent } from "./lines/register-ride.component";
import { ProfileComponent } from "./profile/profile.component";
import { TrackPageComponent } from "./tracker/track.component";
import { SettingsComponent } from "./profile/settings/settings.component";
import { RegisterLineComponent } from "./lines/register-line.component";
import { RidesComponent } from "./rides/rides.component";
var ɵ0 = { requiresLogin: true };
var WEBAPP_ROUTES = [
    // { path: '**', redirectTo: 'feed', pathMatch: 'full'},
    { path: 'feed', component: LiveFeedComponent },
    { path: 'register-line', component: RegisterLineComponent },
    { path: 'ride-center', component: RegisterRideComponent },
    { path: 'rides', component: RidesComponent },
    { path: 'track', component: TrackPageComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'user', component: ProfileComponent, data: ɵ0 },
];
export var webappRouting = RouterModule.forChild(WEBAPP_ROUTES);
export { ɵ0 };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/webapp.routing.js.map