import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: 'app/auth/components/signin.component.html'
})
export class SigninComponent {

  login: any = {};
  loginError: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  signin(login: any) {
    this.authService.login(login.username, login.password).subscribe(
      user => this.router.navigate(['dashboard']),
      error => this.loginError = error
    );
  }

}
