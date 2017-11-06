import { NgModule } from "@angular/core";
import { GoogleSignInComponent } from "angular-google-signin";
import { GoogleAuthComponent } from "../google-auth/google-sign-in.component";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleAuthService } from "../google-auth/googleauth.service";
import { MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatCardModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { FrontSignInComponent } from "./front-sign-in.component";
import { FrontSignUpComponent } from "./front-sign-up.component";

@NgModule({
    declarations: [
        LandingPageComponent,
        GoogleAuthComponent,
        GoogleSignInComponent,
        FrontSignInComponent,
        FrontSignUpComponent
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