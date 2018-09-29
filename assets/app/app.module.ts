import 'rxjs/add/operator/map'
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from "./app.routing";

import { LandingPageModule } from "./landing-page/landing-page.module";
import { AuthGuardService } from "./auth/auth-guard.service";
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "./dictionary/color-dictionary";
import { CONFIG } from "./dictionary/config";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./@core/core.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { UserOptionsDropdownComponent } from "./header/user-options/user-options-dropdown.component";
import { CommonModule } from "@angular/common";
import { ProfileModule } from "./profile/profile.module";
import { LineModule } from "./lines/line.module";
import { TrackPageModule } from "./tracker/track.module";
import { PostModule } from "./posts/post.module";
import { RidesModule } from "./lines/line-history/line-history.module";
import { ComingSoonModule } from "./coming-soon/coming-soon.module";
import {
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";

// TODO: Organize
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidenavComponent,
        UserOptionsDropdownComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        appRouting,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        LandingPageModule,
        CoreModule,
        CommonModule,
        ProfileModule,
        LineModule,
        TrackPageModule,
        PostModule,
        RidesModule,
        ComingSoonModule,
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
    providers: [AuthGuardService, CONFIG, FLAG_DICTIONARY, COLOR_DICTIONARY],
    bootstrap: [AppComponent]
})
export class AppModule { }
