import { RouterModule, Routes } from "@angular/router";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { WebAppComponent } from "./webapp.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterRideComponent } from "./lines/register-ride.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'landing-page', component: LandingPageComponent }, // , loadChildren: './landing-page/landing-page.module#LandingPageModule'
    { path: 'home', component: WebAppComponent, canActivate: [AuthGuard]},
    { path: 'feed', component: LiveFeedComponent},
    { path: 'ride-center', component: RegisterRideComponent, },
    { path: 'user', component: ProfileComponent, data:{requiresLogin: true},loadChildren: './profile/profile.module#ProfileModule'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);