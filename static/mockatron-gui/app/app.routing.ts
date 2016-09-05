import {Routes, RouterModule} from '@angular/router';
import {commonProviders} from './common/common.resources';
import {authRoutes, authProviders} from './auth/auth.routing';
import {pagesRoutes} from './pages/pages.routing';
import {adminRoutes, adminProviders} from './admin/admin.routing';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  ...authRoutes,
  ...pagesRoutes,
  ...adminRoutes
];

export const appRoutingProviders: any[] = [
  commonProviders,
  authProviders,
  adminProviders
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
