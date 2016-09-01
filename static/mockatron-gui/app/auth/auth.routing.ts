import {Routes}          from '@angular/router';
import {AuthGuard}       from './auth.guard';
import {RedirectGuard}   from './redirect.guard';
import {AuthService}     from './services/auth.service';
import {SigninComponent} from './components/signin.component';
import {SignupComponent} from './components/signup.component';

export const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [RedirectGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [RedirectGuard]  }
];

export const authProviders = [
  AuthGuard,
  RedirectGuard,
  AuthService
];
