import { RouterModule, Routes } from "@angular/router";

import { ProfileComponent } from "./profile.component";


const PROFILE_ROUTES: Routes = [
    { path: 'user', redirectTo: 'user/' +localStorage.getItem('username'), pathMatch: 'full' },
    { path: 'user/' + localStorage.getItem('username'), component: ProfileComponent },
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);