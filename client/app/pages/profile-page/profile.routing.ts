import { RouterModule, Routes } from '@angular/router';
import { ProfileTabHomeComponent } from './tabs/profile-tab-home.component';
import { ProfileTabLineHistoryComponent } from './tabs/profile-tab-line-history.component';
import { ProfilePageComponent } from './profile.page.component';
import { ProfileTabFollowersComponent } from './tabs/profile-tab-followers.component';
import { ProfileTabFollowingComponent } from './tabs/profile-tab-following.component';
import { ProfileTabEditComponent } from './tabs/edit/profile-tab-edit.component';

const PROFILE_ROUTES: Routes = [
  {
    path: ':username',
    component: ProfilePageComponent,
    children: [
      { path: '', component: ProfileTabHomeComponent },
      { path: 'lines', component: ProfileTabLineHistoryComponent },
      { path: 'following', component: ProfileTabFollowingComponent },
      { path: 'followers', component: ProfileTabFollowersComponent },
      { path: 'edit', component: ProfileTabEditComponent },
    ],
  },
];

export const profileRoutes = RouterModule.forChild(PROFILE_ROUTES);
