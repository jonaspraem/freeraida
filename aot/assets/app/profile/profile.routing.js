import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
var PROFILE_ROUTES = [
    { path: '', redirectTo: localStorage.getItem('username'), pathMatch: 'full' },
    { path: 'user/:user', component: ProfileComponent },
];
export var profileRouting = RouterModule.forChild(PROFILE_ROUTES);
//# sourceMappingURL=D:/Projects/freeraida/assets/app/profile/profile.routing.js.map