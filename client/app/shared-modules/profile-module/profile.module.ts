import { NgModule } from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileInfoCardComponent } from './profile-info-card/profile-info-card.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { CommonModule } from '@angular/common';
import { NgxMasonryModule } from 'ngx-masonry';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon-module/icon.module';

@NgModule({
  declarations: [ProfileCardComponent, ProfileInfoCardComponent, ProfileHeaderComponent],
  exports: [ProfileCardComponent, ProfileInfoCardComponent, ProfileHeaderComponent],
  imports: [CommonModule, NgxMasonryModule, RouterModule, IconModule],
})
export class ProfileModule {}
