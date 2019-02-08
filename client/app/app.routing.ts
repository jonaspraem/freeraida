import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';
import { LandingPageComponent } from "./pages/landing-page/landing.page.component";
import { RegisterLineComponent } from "./legacy/lines/register/register-line.component";
import { LineHistoryComponent } from "./legacy/lines/line-history/line-history.component";
import { TrackPageComponent } from "./legacy/tracker/track.component";
import { AfterRegistrationComponent } from "./legacy/lines/after-registration/after-registration.component";
import { HomePageComponent } from "./pages/home-page/home.page.component";
import { ProfilePageComponent } from "./pages/profile/profile.page.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent, canActivate: [AuthGuard], data: { state: 'home' }},
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'register-line', component: RegisterLineComponent, canActivate: [AuthGuard], data: { state: 'new-line' }},
    { path: 'line-history', component: LineHistoryComponent},
    { path: 'track', component: TrackPageComponent},
    { path: 'user', children: [
            { path: '', redirectTo: localStorage.getItem('username'), pathMatch: 'full' },
            { path: ':username', component: ProfilePageComponent }]
    },
    { path: 'tracked-line/:id', component: AfterRegistrationComponent},
];

export const appRouting = RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules});