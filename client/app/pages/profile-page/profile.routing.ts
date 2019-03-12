import { RouterModule, Routes } from "@angular/router";
import { ProfileTabHomeComponent } from "./tabs/profile-tab-home.component";
import { ProfileTabLineHistoryComponent } from "./tabs/profile-tab-line-history.component";
import { ProfilePageComponent } from "./profile.page.component";

const PROFILE_ROUTES: Routes = [
    {
        path: ':username', component: ProfilePageComponent, children: [
            {path: '', component: ProfileTabHomeComponent },
            {path: 'lines', component: ProfileTabLineHistoryComponent }
        ]
    },
];

export const profileRoutes = RouterModule.forChild(PROFILE_ROUTES);