import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { LinePageComponent } from './line.page.component';
import { lineRoutes } from './line.routing';
import { LineOverviewComponent } from './components/line-overview/line-overview.component';
import { LineHeightMapComponent } from './components/line-height-map/line-height-map.component';
import { LinePictureTimelineComponent } from './components/line-picture-timeline/line-picture-timeline.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LineModule } from '../../shared-modules/line-module/line.module';
import { LineHeightProfileComponent } from './components/line-height-profile/line-height-profile.component';
import { LineMap3dComponent } from './components/line-map-3d/line-map-3d.component';
import { LineMetricsComponent } from './components/line-metrics/line-metrics.component';

@NgModule({
  declarations: [
    LinePageComponent,
    LineOverviewComponent,
    LineHeightMapComponent,
    LinePictureTimelineComponent,
    LineHeightProfileComponent,
    LineMap3dComponent,
    LineMetricsComponent,
  ],
  exports: [LinePageComponent],
  imports: [lineRoutes, LineModule, SharedModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LinePageModule {}
