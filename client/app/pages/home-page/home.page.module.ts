import { NgModule } from '@angular/core';
import { HomePageComponent } from './home.page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostModule } from '../../shared-modules/post-module/post.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileModule } from '../../shared-modules/profile-module/profile.module';

@NgModule({
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  imports: [FontAwesomeModule, PostModule, SharedModule, ProfileModule],
})
export class HomePageModule {}
