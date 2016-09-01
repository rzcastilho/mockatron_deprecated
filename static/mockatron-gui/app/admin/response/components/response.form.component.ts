import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {ResponseService} from '../services/response.service';
import {OperationService} from '../../operation/services/operation.service';
import {AgentService} from '../../agent/services/agent.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'response-form',
  templateUrl: 'app/admin/response/components/response.form.component.html'
})
export class ResponseFormComponent {

  private sub: Subscription;
  response: any = {};
  isNew: boolean = false;
  agents: any;
  selectedAgent: any;
  operations: any;

  constructor(
    private responseService: ResponseService,
    private operationService: OperationService,
    private agentService: AgentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id != 'new') {
          this.responseService.get(+id).subscribe(
            response => {
              this.response = response;
              if (response.operation != null) {
                this.operationService.get(response.operation).subscribe(
                  operation => {
                    this.response.agent = operation.agent;
                    this.selectAgent(operation.agent);
                  },
                  error => console.log(error)
                );
              }
            },
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

  selectAgent(agent_id: any) {
    this.selectedAgent = { "id": agent_id };
    this.operationService.getByAgent(+agent_id).subscribe(
      operations => this.operations = operations,
      error => console.log(error)
    );
  }

  update(response: any) {
    this.responseService.update(response).subscribe(
      response => this.router.navigate(['/response'])
    );
  }

  create(response: any) {
    this.responseService.create(response).subscribe(
      response => this.router.navigate(['/response'])
    );
  }

  save(response: any) {
    if (this.isNew) {
      this.create(response);
    }
    else {
      this.update(response);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
