import { RouterModule, Routes } from "@angular/router";
import { SettingsPageComponent } from "./settings.page.component";

const SETTINGS_ROUTES: Routes = [
    { path: '', component: SettingsPageComponent },
];

export const settingsRoutes = RouterModule.forChild(SETTINGS_ROUTES);
