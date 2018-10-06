import 'rxjs/add/operator/map'
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from "./app.routing";

import { LandingPageModule } from "./@pages/landing-page/landing-page.module";
import { FLAG_DICTIONARY } from "./dictionary/flag-dictionary";
import { COLOR_DICTIONARY } from "./dictionary/color-dictionary";
import { CONFIG } from "./dictionary/config";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "./@core/core.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { HeaderComponent } from "./@features/header/header.component";
import { UserOptionsDropdownComponent } from "./@features/header/user-options/user-options-dropdown.component";
import { CommonModule } from "@angular/common";
import { ProfileModule } from "./profile/profile.module";
import { LineModule } from "./lines/line.module";
import { TrackPageModule } from "./tracker/track.module";
import { PostModule } from "./posts/post.module";
import { RidesModule } from "./lines/line-history/line-history.module";
import { ComingSoonModule } from "./coming-soon/coming-soon.module";
import { FeatureModule } from "./@features/features.module";
import { PageModule } from './@pages/feature.module';
import {
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
import { WINDOW_PROVIDERS } from "./@core/services/window.service";
import { RouterModule } from '@angular/router';

// TODO: Organize
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserOptionsDropdownComponent
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
        ProfileModule,
        LineModule,
        TrackPageModule,
        PostModule,
        RidesModule,
        ComingSoonModule,
        FeatureModule,
        PageModule,
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
    providers: [CONFIG, FLAG_DICTIONARY, COLOR_DICTIONARY, WINDOW_PROVIDERS],
    bootstrap: [AppComponent]
})
export class AppModule { }
