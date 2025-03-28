import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing.page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
  ],
  entryComponents: [LandingPageComponent],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}
