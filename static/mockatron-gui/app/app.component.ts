import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth/services/auth.service'
import {ResumeService} from './common/services/resume.service';

@Component({
  selector: 'mockatron-app',
  templateUrl : 'app/app.component.html'
})
export class AppComponent {

  resume: any;

  constructor(private authService: AuthService, private router: Router, private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.resume().subscribe(
      resume => this.resume = resume,
      error => console.log(error)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['signin'])
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
