import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { WebAppComponent } from "./webapp.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'landing-page', pathMatch: 'full'},
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'home', component: WebAppComponent, loadChildren: './webapp.module#WebAppModule'},
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

export const appRouting = RouterModule.forRoot(APP_ROUTES);