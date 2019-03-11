import { RouterModule, Routes } from "@angular/router";
import { ProfileTabHomeComponent } from "./tabs/profile-tab-home.component";
import { ProfileTabLineHistoryComponent } from "./tabs/profile-tab-line-history.component";
import { ProfilePageComponent } from "./profile.page.component";

const PROFILE_ROUTES: Routes = [
    {
        path: '', component: ProfilePageComponent, children: [
            {path: '', component: ProfileTabHomeComponent},
            {path: 'lines', component: ProfileTabLineHistoryComponent, outlet: 'profile-outlet'}
        ]
    },
];

export default PROFILE_ROUTES;