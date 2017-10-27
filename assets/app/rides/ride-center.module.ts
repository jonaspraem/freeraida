import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";

// Material design
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule
} from '@angular/material';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { RegisterRideComponent } from "./register-ride.component";
import { MapContentComponent } from "./map-content";


@NgModule({
    declarations: [
        RegisterRideComponent,
        MapContentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
        }),
        MDBBootstrapModule.forRoot(),
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule
    ]
})

export class RideCenterModule {

}