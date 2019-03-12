import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';
import { LandingPageComponent } from "./pages/landing-page/landing.page.component";
import { HomePageComponent } from "./pages/home-page/home.page.component";
import { LineCreatorPageComponent } from "./pages/line-creater-page/line-creater.page.component";

const APP_ROUTES: Routes = [
    { path: '', component: HomePageComponent, canActivate: [AuthGuard], data: { state: 'home' }},
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'line-creator', component: LineCreatorPageComponent, canActivate: [AuthGuard]},
    { path: 'user', loadChildren: './pages/profile-page/profile.page.module#ProfilePageModule' },
];

export const appRouting = RouterModule.forRoot(APP_ROUTES);