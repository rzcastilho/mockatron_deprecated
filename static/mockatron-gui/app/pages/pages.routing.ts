import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../auth/auth.guard';
import {ResumeService} from './services/resume.service';

export const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

export const pagesProviders = [
  ResumeService
];
