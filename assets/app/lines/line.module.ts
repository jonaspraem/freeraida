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


@NgModule({
    declarations: [
        RegisterRideComponent,
        MapContentComponent,
        LineHistoryComponent,
        RegisterLineComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
        }),
        NvD3Module,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatInputModule
    ],
    exports: [
        LineHistoryComponent, RegisterLineComponent
    ],
    providers: [LineService]
})

export class LineModule {

}