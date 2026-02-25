import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile.page.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfilePageService } from './profile-page.service';
import { profileRoutes } from './profile.routing';
import { ProfileTabLineHistoryComponent } from './tabs/profile-tab-line-history.component';
import { ProfileTabHomeComponent } from './tabs/profile-tab-home.component';
import { RouterModule } from '@angular/router';
import { PostModule } from '../../shared-modules/post-module/post.module';
import { LineModule } from '../../shared-modules/line-module/line.module';
import { ProfileModule } from '../../shared-modules/profile-module/profile.module';
import { ProfileTabFollowersComponent } from './tabs/profile-tab-followers.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { ProfileTabFollowingComponent } from './tabs/profile-tab-following.component';
import { ProfileTabEditComponent } from './tabs/edit/profile-tab-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileTabLineHistoryComponent,
    ProfileTabHomeComponent,
    ProfileTabFollowingComponent,
    ProfileTabFollowersComponent,
    ProfileTabEditComponent,
  ],
  imports: [
    profileRoutes,
    SharedModule,
    PostModule,
    LineModule,
    ProfileModule,
    NgxMasonryModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [ProfilePageComponent, RouterModule],
  providers: [ProfilePageService],
})
export class ProfilePageModule {}
