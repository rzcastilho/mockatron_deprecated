import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: 'app/auth/components/signup.component.html'
})
export class SignupComponent {

  user: any = {};
  userError: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  signup(user: any) {
    this.authService.signup(user).subscribe(
      user => this.router.navigate(['signin']),
      error => this.userError = error
    );
  }

}
