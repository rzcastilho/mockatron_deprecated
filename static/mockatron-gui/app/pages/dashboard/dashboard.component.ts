import {Component, OnInit} from '@angular/core';
import {ResumeService} from '../services/resume.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/pages/dashboard/dashboard.component.html'
})
export class DashboardComponent {

  resume: any;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.resume().subscribe(
      resume => this.resume = resume,
      error => console.log(error)
    );
  }

}
