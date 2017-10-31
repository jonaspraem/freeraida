import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material design
import {
    MatSidenavModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonToggleModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header/header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { ProfileModule } from "./profile/profile.module";
import { PostModule } from "./posts/post.module";
import { RideCenterModule } from "./lines/ride-center.module";

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuard } from "./auth-guard.service";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { WebAppComponent } from "./webapp.component";
import { LandingPageModule } from "./landing-page/landing-page.module";

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        WebAppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpModule,
        ProfileModule,
        RideCenterModule,
        LandingPageModule,
        MDBBootstrapModule.forRoot(),

        // Material design modules:
        MatSidenavModule,
        MatCardModule,
        PostModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonToggleModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    providers: [AuthService, ErrorService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
