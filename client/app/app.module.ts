import 'rxjs/add/operator/map';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { LandingPageModule } from './pages/landing-page/landing.page.module';
import { FLAG_DICTIONARY } from './dictionary/flag-dictionary';
import { COLOR_DICTIONARY } from './dictionary/color-dictionary';
import { CONFIG } from './dictionary/config';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { WINDOW_PROVIDERS } from './core/services/window.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { HomePageModule } from './pages/home-page/home.page.module';
import { SharedModule } from './shared/shared.module';
import { LineModule } from './shared-modules/line-module/line.module';
import { NavigationModule } from './shared-modules/navigation-module/navigation.module';
import { IconModule } from './shared-modules/icon-module/icon.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    appRouting,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    LandingPageModule,
    CoreModule,
    CommonModule,
    LineModule,
    IconModule,
    NavigationModule,
    SharedModule,
    HomePageModule,
    FontAwesomeModule,
    // ChartsModule,
    // Material design modules:
    MatSidenavModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonToggleModule,
  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CONFIG, SharedModule, FontAwesomeModule, IconModule, FLAG_DICTIONARY, COLOR_DICTIONARY, WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
