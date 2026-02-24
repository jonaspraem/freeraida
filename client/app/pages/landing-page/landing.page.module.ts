import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { LandingPageComponent } from './landing.page.component';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}
