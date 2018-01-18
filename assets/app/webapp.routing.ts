import { RouterModule, Routes } from "@angular/router";

import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { ProfileComponent } from "./profile/profile.component";
import { TrackPageComponent } from "./tracker/track.component";
import { SettingsComponent } from "./profile/settings/settings.component";
import { RegisterLineComponent } from "./lines/register-line.component";
import { RidesComponent } from "./rides/rides.component";

// Do not delete. Used to ensure ProfileModule is loaded in the same bundle.
// Referencing the function directly in `loadChildren` breaks AoT compiler.
// export function loadProfileModule() {
//     return ProfileModule;
// }

const WEBAPP_ROUTES: Routes = [
    // { path: '**', redirectTo: 'feed', pathMatch: 'full'},
    { path: 'feed', component: LiveFeedComponent},
    { path: 'register-line', component: RegisterLineComponent},
    { path: 'rides', component: RidesComponent},
    { path: 'track', component: TrackPageComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'user', component: ProfileComponent, children: [
            { path: '', redirectTo: localStorage.getItem('username'), pathMatch: 'full' },
            { path: ':id', component: ProfileComponent }
        ]}
];

export const webappRouting = RouterModule.forChild(WEBAPP_ROUTES);