import { RouterModule, Routes } from "@angular/router";

import { LiveFeedComponent } from "./posts/feed/live-feed.component";
import { ProfileComponent } from "./profile/profile.component";
import { TrackPageComponent } from "./tracker/track.component";
import { SettingsComponent } from "./profile/settings/settings.component";
import { RegisterLineComponent } from "./lines/register/register-line.component";
import { LineHistoryComponent } from "./lines/line-history/line-history.component";
import { ForumsComponent } from "./coming-soon/forums/forums.component";
import { BeginnersGuideComponent } from "./coming-soon/beginners-guide/beginners-guide.component";
import { WikiComponent } from "./coming-soon/wiki/wiki.component";
import { EventsComponent } from "./coming-soon/events/events.component";
import { AfterRegistrationComponent } from "./lines/after-registration/after-registration.component";

const WEBAPP_ROUTES: Routes = [
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
    { path: '', redirectTo: 'home/feed', pathMatch: 'full'},
];

export const webappRouting = RouterModule.forChild(WEBAPP_ROUTES);