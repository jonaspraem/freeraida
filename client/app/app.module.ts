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
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WINDOW_PROVIDERS } from './core/services/window.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  providers: [CONFIG, FLAG_DICTIONARY, COLOR_DICTIONARY, WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
