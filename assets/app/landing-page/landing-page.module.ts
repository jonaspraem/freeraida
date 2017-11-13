import { NgModule } from "@angular/core";
import { GoogleSignInComponent } from "angular-google-signin";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatCardModule, MatFormFieldModule, MatInputModule } from "@angular/material";

@NgModule({
    declarations: [
        LandingPageComponent,
        GoogleSignInComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [ {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'auto'}} ]
})

export class LandingPageModule {}