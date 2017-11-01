import { NgModule } from "@angular/core";
import { GoogleSignInComponent } from "angular-google-signin";
import { GoogleAuthComponent } from "../google-auth/google-sign-in.component";
import { LandingPageComponent } from "./landing-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleAuthService } from "../google-auth/google-auth.service";

@NgModule({
    declarations: [
        LandingPageComponent,
        GoogleAuthComponent,
        GoogleSignInComponent
    ],
    imports: [
    CommonModule,
    ReactiveFormsModule
    ],
    providers: [ GoogleAuthService ]
})

export class LandingPageModule {}