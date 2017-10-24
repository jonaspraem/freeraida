import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RegisterRideComponent } from "./register-ride.component";
import { AgmCoreModule } from "@agm/core";

// Material design
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
} from '@angular/material';


@NgModule({
    declarations: [
        RegisterRideComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCiVeucFCv7dkLF9N_VFaHo48b7wb4s8OM'
        }),
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule
    ]
})

export class RideCenterModule {

}