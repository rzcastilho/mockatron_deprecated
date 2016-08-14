import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth/services/auth.service'

@Component({
  selector: 'mockatron-app',
  templateUrl : 'app/app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['signin'])
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
