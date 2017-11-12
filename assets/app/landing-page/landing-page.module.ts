import { NgModule } from "@angular/core";
import { GoogleSignInComponent } from "angular-google-signin";
import { GoogleAuthComponent } from "../google-auth/google-sign-in.component";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleAuthService } from "../google-auth/googleauth.service";
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatCardModule, MatFormFieldModule, MatInputModule } from "@angular/material";

@NgModule({
    declarations: [
        LandingPageComponent,
        GoogleAuthComponent,
        GoogleSignInComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [ GoogleAuthService, {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'auto'}} ]
})

export class LandingPageModule {}