import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';
import { LandingPageComponent } from "./pages/landing-page/landing.page.component";
import { TrackPageComponent } from "./legacy/tracker/track.component";
import { HomePageComponent } from "./pages/home-page/home.page.component";
import { ProfilePageComponent } from "./pages/profile/profile.page.component";
import { LineCreatorComponent } from "./components/line-module/line-creater/line-creater.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent, canActivate: [AuthGuard], data: { state: 'home' }},
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'line-creator', component: LineCreatorComponent, canActivate: [AuthGuard]},
    { path: 'track', component: TrackPageComponent},
    { path: 'user', children: [
            { path: '', redirectTo: localStorage.getItem('username'), pathMatch: 'full' },
            { path: ':username', component: ProfilePageComponent }]
    },
];

export const appRouting = RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules});