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
import { appRouting } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { PostModule } from "./posts/post.module";

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuard } from "./auth-guard.service";
import { WebAppComponent } from "./webapp.component";
import { LandingPageModule } from "./landing-page/landing-page.module";
import { NewAuthService } from "./auth/new-auth.service";
import { AuthGuardService } from "./auth/auth-guard.service";
import { WebAppModule } from "./webapp.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        appRouting,
        HttpModule,
        LandingPageModule,
        WebAppModule,
        MDBBootstrapModule.forRoot(),
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    providers: [AuthService, AuthGuardService, NewAuthService, ErrorService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
