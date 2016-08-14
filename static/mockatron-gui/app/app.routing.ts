import { Routes, RouterModule } from '@angular/router';
import { authRoutes, authProviders } from './auth/auth.routing';
import { pagesRoutes } from './pages/pages.routing';
import { adminRoutes } from './admin/admin.routing';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  ...authRoutes,
  ...pagesRoutes,
  ...adminRoutes
];

export const appRoutingProviders: any[] = [
  authProviders
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
