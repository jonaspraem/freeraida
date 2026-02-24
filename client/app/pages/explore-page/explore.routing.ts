import { RouterModule, Routes } from '@angular/router';
import { ExplorePageComponent } from './explore.page.component';

const EXPLORE_ROUTES: Routes = [{ path: '', component: ExplorePageComponent }];

export const exploreRoutes = RouterModule.forChild(EXPLORE_ROUTES);
