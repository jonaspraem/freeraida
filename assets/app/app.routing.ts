import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { ProfileComponent } from "./profile/profile.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: SidebarComponent },
    { path: 'user', component: ProfileComponent, loadChildren: './profile/profile.module#ProfileModule'},
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);