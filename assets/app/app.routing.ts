import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { ProfileComponent } from "./profile/profile.component";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterRideComponent } from "./lines/register-ride.component";
import { AuthGuard } from "./auth-guard.service";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { WebAppComponent } from "./webapp.component";

const APP_ROUTES: Routes = [
    { path: 'landing-page', component: LandingPageComponent }, // , loadChildren: './landing-page/landing-page.module#LandingPageModule'
    { path: '', component: WebAppComponent, data:{requiresLogin: true}, canActivate: [AuthGuard]},
    { path: 'home', component: LiveFeedComponent, data:{requiresLogin: true}, canActivate: [AuthGuard]},
    // { path: 'ride-center', component: RegisterRideComponent, data:{requiresLogin: true}},
    // { path: 'user', component: ProfileComponent, data:{requiresLogin: true},loadChildren: './profile/profile.module#ProfileModule'},
    // { path: 'auth', component: AuthenticationComponent, data:{requiresLogin: true},loadChildren: './auth/auth.module#AuthModule'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);