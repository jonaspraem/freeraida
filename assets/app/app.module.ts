import 'rxjs/add/operator/map'
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from "./app.routing";

import { LandingPageModule } from "./landing-page/landing-page.module";
import { AuthGuardService } from "./auth/auth-guard.service";
import { WebAppModule } from "./webapp.module";
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "./dictionary/color-dictionary";
import { CONFIG } from "./dictionary/config";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./@core/core.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";

// TODO: Organize
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        appRouting,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        LandingPageModule,
        WebAppModule,
        CoreModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    providers: [AuthGuardService, CONFIG, FLAG_DICTIONARY, COLOR_DICTIONARY],
    bootstrap: [AppComponent]
})
export class AppModule { }
