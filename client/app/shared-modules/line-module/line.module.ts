import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LineCreatorPageComponent } from '../../pages/line-creater-page/line-creater.page.component';
import { HeightMapComponent } from './height-map/height-map.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MatIconModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineSummaryComponent } from './line-summary/line-summary.component';
import { LineMapListComponent } from './line-map-list/line-map-list.component';
import { LineMapComponent } from './line-map/line-map.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

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
    Ng2GoogleChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM',
    }),
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LineModule {}
