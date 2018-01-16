import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { FormsModule }   from '@angular/forms';

import { NvD3Module } from 'ng2-nvd3';
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

import { RegisterRideComponent } from "./register-ride.component";
import { MapContentComponent } from "./map-content";
import { LineService } from "./line.service";
import { LineHistoryComponent } from "./line-history.component";
import { RegisterLineComponent } from "./register-line.component";
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { HeightMapComponent } from "./hieghtmap/heightmap.component";
import { LineMapComponent } from "./map/line-map.component";


@NgModule({
    declarations: [
        RegisterRideComponent,
        MapContentComponent,
        LineHistoryComponent,
        RegisterLineComponent,
        HeightMapComponent,
        LineMapComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
        }),
        AmChartsModule,
        NvD3Module,
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
        LineMapComponent
    ],
    providers: [LineService]
})

export class LineModule {

}