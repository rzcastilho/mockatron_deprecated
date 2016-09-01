import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {OperationService} from '../services/operation.service';
import {AgentService} from '../../agent/services/agent.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'operation-form',
  templateUrl: 'app/admin/operation/components/operation.form.component.html'
})
export class OperationFormComponent {

  private sub: Subscription;
  operation: any = {
    "responses":[],
    "filters":[]
  };
  isNew: boolean = false;
  agents: any;

  constructor(private operationService: OperationService, private agentService: AgentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id != 'new') {
          this.operationService.get(+id).subscribe(
            operation => this.operation = operation,
            error => console.log(error)
          );
        }
        else {
          this.isNew = true;
        }
      }
    );
    this.agentService.getAll().subscribe(
      agents => this.agents = agents,
      error => console.log(error)
    );
  }

  update(operation: any) {
    this.operationService.update(operation).subscribe(
      operation => this.router.navigate(['/operation'])
    );
  }

  create(operation: any) {
    this.operationService.create(operation).subscribe(
      operation => this.router.navigate(['/operation'])
    );
  }

  save(operation: any) {
    if (this.isNew) {
      this.create(operation);
    }
    else {
      this.update(operation);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
