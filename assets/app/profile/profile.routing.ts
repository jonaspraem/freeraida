import { RouterModule, Routes } from "@angular/router";

import { ProfileComponent } from "./profile.component";


const PROFILE_ROUTES: Routes = [
    { path: '', redirectTo: localStorage.getItem('username'), pathMatch: 'full' },
    { path: 'user/:user', component: ProfileComponent },
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);