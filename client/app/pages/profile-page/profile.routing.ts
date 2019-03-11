import { RouterModule, Routes } from "@angular/router";
import { ProfileTabHomeComponent } from "./tabs/profile-tab-home.component";
import { ProfileTabLineHistoryComponent } from "./tabs/profile-tab-line-history.component";

const PROFILE_ROUTES: Routes = [
    { path: '', component: ProfileTabHomeComponent, outlet: 'profile-outlet' },
    { path: 'lines', component: ProfileTabLineHistoryComponent, outlet: 'profile-outlet' }
];

export const profileRoutes = RouterModule.forChild(PROFILE_ROUTES);