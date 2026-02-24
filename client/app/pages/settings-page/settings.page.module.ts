import { NgModule } from '@angular/core';
import { SettingsPageComponent } from './settings.page.component';
import { settingsRoutes } from './settings.routing';

@NgModule({
  declarations: [SettingsPageComponent],
  exports: [SettingsPageComponent],
  imports: [settingsRoutes],
})
export class SettingsPageModule {}
