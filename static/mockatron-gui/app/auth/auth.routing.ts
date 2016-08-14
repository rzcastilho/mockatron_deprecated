import { Routes }         from '@angular/router';
import { AuthGuard }      from './auth.guard';
import { AuthService }    from './services/auth.service';
import { SigninComponent } from './components/signin.component';
import { SignupComponent } from './components/signup.component';

export const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

export const authProviders = [
  AuthGuard,
  AuthService
];
