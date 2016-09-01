import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AgentService} from '../services/agent.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'agent-form',
  templateUrl: 'app/admin/agent/components/agent.form.component.html'
})
export class AgentFormComponent {

  private sub: Subscription;
  agent: any = {
    "operations":[],
    "responses":[],
    "filters":[]
  };
  isNew: boolean = false;

  constructor(private agentService: AgentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id != 'new') {
          this.agentService.get(+id).subscribe(
            agent => this.agent = agent,
            error => console.log(error)
          );
        }
        else {
          this.isNew = true;
        }
      }
    );
  }

  update(agent: any) {
    this.agentService.update(agent).subscribe(
      agent => this.router.navigate(['/agent'])
    );
  }

  create(agent: any) {
    this.agentService.create(agent).subscribe(
      agent => this.router.navigate(['/agent'])
    );
  }

  save(agent: any) {
    if (this.isNew) {
      this.create(agent);
    }
    else {
      this.update(agent);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
