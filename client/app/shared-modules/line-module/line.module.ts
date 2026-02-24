import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LineCreatorPageComponent } from '../../pages/line-creater-page/line-creater.page.component';
import { HeightMapComponent } from './height-map/height-map.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineSummaryComponent } from './line-summary/line-summary.component';
import { LineMapListComponent } from './line-map-list/line-map-list.component';
import { LineMapComponent } from './line-map/line-map.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    LineCreatorPageComponent,
    HeightMapComponent,
    LineSummaryComponent,
    LineMapListComponent,
    LineMapComponent,
  ],
  exports: [LineCreatorPageComponent, LineSummaryComponent, LineMapComponent],
  imports: [
    SharedModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class LineModule {}
