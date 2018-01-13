import { RouterModule } from "@angular/router";
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { WebAppComponent } from "./webapp.component";
var APP_ROUTES = [
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'home', component: WebAppComponent, canActivate: [AuthGuard], loadChildren: './webapp.module#WebAppModule' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
export var appRouting = RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=D:/Projects/freeraida/assets/app/app.routing.js.map