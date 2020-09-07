import { NgModule } from '@angular/core';
import { LinePageComponent } from './line.page.component';
import { lineRoutes } from './line.routing';
import { LineOverviewComponent } from './components/line-overview/line-overview.component';
import { LineHeightMapComponent } from './components/line-height-map/line-height-map.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { LinePictureTimelineComponent } from './components/line-picture-timeline/line-picture-timeline.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LineModule } from '../../shared-modules/line-module/line.module';

@NgModule({
  declarations: [LinePageComponent, LineOverviewComponent, LineHeightMapComponent, LinePictureTimelineComponent],
  entryComponents: [LinePageComponent],
  exports: [LinePageComponent],
  imports: [lineRoutes, LineModule, SharedModule, Ng2GoogleChartsModule, FormsModule],
})
export class LinePageModule {}
