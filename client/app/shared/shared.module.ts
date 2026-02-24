import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOverlayComponent } from './components/edit-overlay/edit-overlay.component';
import { ActionArrowLeftComponent } from './components/action-arrow-left.component';
import { GoogleChartsModule } from 'angular-google-charts';

/**
 * @author JP
 * Purpose of this module is to hold all shared components which doesn't not match with any of the packaged shared modules.
 * A module package is always preferred over having the component declared here.
 */

@NgModule({
  declarations: [ActionArrowLeftComponent, EditOverlayComponent],
  imports: [CommonModule, GoogleChartsModule],
  exports: [CommonModule, GoogleChartsModule, ActionArrowLeftComponent, EditOverlayComponent],
})
export class SharedModule {}
