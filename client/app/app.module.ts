import 'rxjs/add/operator/map'
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from "./app.routing";

import { LandingPageModule } from "./pages/landing-page/landing.page.module";
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "./dictionary/color-dictionary";
import { CONFIG } from "./dictionary/config";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./core/core.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HeaderComponent } from "./components/header/header.component";
import { UserNavMenuComponent } from "./components/header/user-nav-menu/user-nav-menu.component";
import { CommonModule } from "@angular/common";
import { TrackPageModule } from "./legacy/tracker/track.module";
import { PageModule } from './pages/pages.module';
import {
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
import { WINDOW_PROVIDERS } from "./core/services/window.service";
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LineModule } from "./components/line-module/line.module";
import { ChartsModule } from "ng2-charts";

// TODO: Organize
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserNavMenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule,
        appRouting,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        LandingPageModule,
        CoreModule,
        CommonModule,
        LineModule,
        TrackPageModule,
        PageModule,
        FontAwesomeModule,
        ChartsModule,
        // Material design modules:
        MatSidenavModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonToggleModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    providers: [
        CONFIG,
        FontAwesomeModule,
        FLAG_DICTIONARY,
        COLOR_DICTIONARY,
        WINDOW_PROVIDERS,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
