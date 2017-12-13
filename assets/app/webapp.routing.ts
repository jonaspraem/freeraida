import { RouterModule, Routes } from "@angular/router";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterRideComponent } from "./lines/register-ride.component";
import { ProfileComponent } from "./profile/profile.component";
import { TrackPageComponent } from "./tracker/track-page.component";
import { SettingsComponent } from "./profile/settings/settings.component";

const WEBAPP_ROUTES: Routes = [
    // { path: '**', redirectTo: '', pathMatch: 'full'}
    { path: 'feed', component: LiveFeedComponent},
    { path: 'ride-center', component: RegisterRideComponent},
    { path: 'track', component: TrackPageComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'user', component: ProfileComponent, data:{requiresLogin: true},loadChildren: './profile/profile.module#ProfileModule'},
];

export const webappRouting = RouterModule.forChild(WEBAPP_ROUTES);