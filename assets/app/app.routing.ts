import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { ProfileComponent } from "./profile/profile.component";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterRideComponent } from "./lines/register-ride.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/feed', pathMatch: 'full' },
    { path: 'feed', component: LiveFeedComponent },
    { path: 'ride-center', component: RegisterRideComponent },
    { path: 'user', component: ProfileComponent, loadChildren: './profile/profile.module#ProfileModule'},
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);