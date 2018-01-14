import 'rxjs/add/operator/map'
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from "./app.routing";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";

import { LandingPageModule } from "./landing-page/landing-page.module";
import { AuthService } from "./auth/auth.service";
import { AuthGuardService } from "./auth/auth-guard.service";
import { WebAppModule } from "./webapp.module";
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "./dictionary/color-dictionary";
import { CONFIG } from "./dictionary/config";

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        appRouting,
        HttpClientModule,
        LandingPageModule,
        WebAppModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    providers: [AuthGuardService, AuthService, ErrorService, CONFIG, FLAG_DICTIONARY, COLOR_DICTIONARY],
    bootstrap: [AppComponent]
})
export class AppModule { }
