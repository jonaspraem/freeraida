import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { FormsModule }   from '@angular/forms';

import 'd3';
import 'nvd3';

// Material design
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatInputModule
} from '@angular/material';

import { MapContentComponent } from "./map-content";
import { LineService } from "./line.service";
import { LineHistoryComponent } from "./line-history.component";
import { RegisterLineComponent } from "./register-line.component";
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { HeightMapComponent } from "./heightmap/registered/heightmap.component";
import { LineMapComponent } from "./map/registered/line-map.component";
import { LineMapUnregisteredComponent } from "./map/un-registered/line-map-unregistered.component";
import { HeightmapUnregisteredComponent } from "./heightmap/un-registered/heightmap-unregistered.component";


@NgModule({
    declarations: [
        MapContentComponent,
        LineHistoryComponent,
        RegisterLineComponent,
        HeightMapComponent,
        LineMapComponent,
        LineMapUnregisteredComponent,
        HeightmapUnregisteredComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
        }),
        AmChartsModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatInputModule
    ],
    exports: [
        LineHistoryComponent,
        RegisterLineComponent,
        HeightMapComponent,
        LineMapComponent,
        LineMapUnregisteredComponent,
        HeightmapUnregisteredComponent
    ],
    providers: [LineService]
})

export class LineModule {

}