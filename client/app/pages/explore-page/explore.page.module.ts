import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../shared/shared.module';
import { LineModule } from '../../shared-modules/line-module/line.module';
import { ExplorePageComponent } from './explore.page.component';
import { exploreRoutes } from './explore.routing';

@NgModule({
  declarations: [ExplorePageComponent],
  exports: [ExplorePageComponent],
  imports: [exploreRoutes, SharedModule, GoogleMapsModule, LineModule],
})
export class ExplorePageModule {}
