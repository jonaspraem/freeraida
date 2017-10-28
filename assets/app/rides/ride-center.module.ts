import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Material design
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatInputModule
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
        FormsModule,
        BrowserModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
        }),
        MDBBootstrapModule.forRoot(),
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatInputModule
    ]
})

export class RideCenterModule {

}