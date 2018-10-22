import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { RegisterLineComponent } from "./legacy/lines/register/register-line.component";
import { LineHistoryComponent } from "./legacy/lines/line-history/line-history.component";
import { TrackPageComponent } from "./legacy/tracker/track.component";
import { BeginnersGuideComponent } from "./legacy/coming-soon/beginners-guide/beginners-guide.component";
import { WikiComponent } from "./legacy/coming-soon/wiki/wiki.component";
import { ForumsComponent } from "./legacy/coming-soon/forums/forums.component";
import { EventsComponent } from "./legacy/coming-soon/events/events.component";
import { SettingsComponent } from "./legacy/profile/settings/settings.component";
import { ProfileComponent } from "./legacy/profile/profile.component";
import { AfterRegistrationComponent } from "./legacy/lines/after-registration/after-registration.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], data: { state: 'home' }},
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'register-line', component: RegisterLineComponent, canActivate: [AuthGuard], data: { state: 'new-line' }},
    { path: 'line-history', component: LineHistoryComponent},
    { path: 'track', component: TrackPageComponent},
    { path: 'school', component: BeginnersGuideComponent},
    { path: 'wiki', component: WikiComponent},
    { path: 'forums', component: ForumsComponent},
    { path: 'events', component: EventsComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'user/:id', component: ProfileComponent},
    { path: 'tracked-line/:id', component: AfterRegistrationComponent},
];

export const appRouting = RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules});