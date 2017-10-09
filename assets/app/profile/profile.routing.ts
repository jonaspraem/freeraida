import { RouterModule, Routes } from "@angular/router";

import { ProfileComponent } from "./profile.component";


const PROFILE_ROUTES: Routes = [
    { path: 'profile', redirectTo: localStorage.getItem('username'), pathMatch: 'full' },
    { path: 'profile/' + localStorage.getItem('username'), component: ProfileComponent },
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);