import { RouterModule, Routes } from "@angular/router";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterRideComponent } from "./lines/register-ride.component";
import { ProfileComponent } from "./profile/profile.component";
import { WebAppComponent } from "./webapp.component";
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const WEBAPP_ROUTES: Routes = [
    // { path: '', component: WebAppComponent, canActivate: [AuthGuard]},
    // { path: '**', redirectTo: '', pathMatch: 'full'}
    { path: 'feed', component: LiveFeedComponent},
    { path: 'ride-center', component: RegisterRideComponent},
    { path: 'user', component: ProfileComponent, data:{requiresLogin: true},loadChildren: './profile/profile.module#ProfileModule', outlet: 'web-app'},
];

export const webappRouting = RouterModule.forChild(WEBAPP_ROUTES);