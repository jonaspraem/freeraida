import { RouterModule, Routes } from '@angular/router';
import { LinePageComponent } from './line.page.component';

const LINE_ROUTES: Routes = [{ path: ':id', component: LinePageComponent }];

export const lineRoutes = RouterModule.forChild(LINE_ROUTES);
