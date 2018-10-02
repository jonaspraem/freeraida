import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LandingPageComponent } from "./@pages/landing-page/landing-page.component";
import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { RegisterLineComponent } from "./lines/register/register-line.component";
import { LineHistoryComponent } from "./lines/line-history/line-history.component";
import { TrackPageComponent } from "./tracker/track.component";
import { BeginnersGuideComponent } from "./coming-soon/beginners-guide/beginners-guide.component";
import { WikiComponent } from "./coming-soon/wiki/wiki.component";
import { ForumsComponent } from "./coming-soon/forums/forums.component";
import { EventsComponent } from "./coming-soon/events/events.component";
import { SettingsComponent } from "./profile/settings/settings.component";
import { ProfileComponent } from "./profile/profile.component";
import { AfterRegistrationComponent } from "./lines/after-registration/after-registration.component";
import { HomePageComponent } from "./@pages/home-page/home-page.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'feed', component: LiveFeedComponent},
    { path: 'register-line', component: RegisterLineComponent},
    { path: 'line-history', component: LineHistoryComponent},
    { path: 'track', component: TrackPageComponent},
    { path: 'school', component: BeginnersGuideComponent},
    { path: 'wiki', component: WikiComponent},
    { path: 'forums', component: ForumsComponent},
    { path: 'events', component: EventsComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'user/:id', component: ProfileComponent},
    { path: 'tracked-line/:id', component: AfterRegistrationComponent},
   // { path: '**', redirectTo: '', pathMatch: 'full'},
];

export const appRouting = RouterModule.forRoot(APP_ROUTES);