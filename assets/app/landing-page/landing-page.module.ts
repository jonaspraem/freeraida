import { NgModule } from "@angular/core";
import { GoogleSignInComponent } from "angular-google-signin";
import { GoogleAuthComponent } from "../google-auth/google-sign-in.component";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { GoogleAuthService } from "../google-auth/googleauth.service";
import { MatCardModule } from "@angular/material";

@NgModule({
    declarations: [
        LandingPageComponent,
        GoogleAuthComponent,
        GoogleSignInComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        MatCardModule
    ],
    providers: [ GoogleAuthService ]
})

export class LandingPageModule {}