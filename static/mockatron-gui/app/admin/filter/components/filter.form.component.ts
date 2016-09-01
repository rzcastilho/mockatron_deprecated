import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FilterService} from '../services/filter.service';
import {OperationService} from '../../operation/services/operation.service';
import {AgentService} from '../../agent/services/agent.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'filter-form',
  templateUrl: 'app/admin/filter/components/filter.form.component.html'
})
export class FilterFormComponent {

  private sub: Subscription;
  filter: any = {
    "request_conditions": [],
    "response_conditions": []
  };
  isNew: boolean = false;
  agents: any;
  selectedAgent: any;
  operations: any;

  constructor(
    private filterService: FilterService,
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
          this.filterService.get(+id).subscribe(
            filter => {
              this.filter = filter;
              if (filter.operation != null) {
                this.operationService.get(filter.operation).subscribe(
                  operation => {
                    this.filter.agent = operation.agent;
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

  update(filter: any) {
    this.filterService.update(filter).subscribe(
      filter => this.router.navigate(['/filter'])
    );
  }

  create(filter: any) {
    this.filterService.create(filter).subscribe(
      filter => this.router.navigate(['/filter'])
    );
  }

  save(filter: any) {
    if (this.isNew) {
      this.create(filter);
    }
    else {
      this.update(filter);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
