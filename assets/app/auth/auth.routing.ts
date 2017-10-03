import { RouterModule, Routes } from "@angular/router";
import {SignUpComponent} from "./sign-up.component";
import {SignInComponent} from "./sign-in.component";
import {LogoutComponent} from "./logout.component";

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'logout', component: LogoutComponent },
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);