import {Component, OnInit} from '@angular/core';
import {AgentService} from '../services/agent.service';
import {MessageService} from '../../../common/services/message.service';

@Component({
  selector: 'agent',
  templateUrl: 'app/admin/agent/components/agent.component.html'
})
export class AgentComponent {

  agents: any;
  selectedAgent: any;

  constructor(private agentService: AgentService, private messageService: MessageService) { }

  ngOnInit() {
    this.agentService.getAll().subscribe(
      agents => this.agents = agents,
      error => console.log(error)
    );
  }

  select(agent: any) {
    this.selectedAgent = agent;
  }

  delete(agent: any) {
    this.agentService.delete(agent).subscribe(
      res => {
        let index = this.agents.indexOf(agent);
        if (index >= 0) {
          this.agents.splice(index, 1);
        }
        this.messageService.success("Agent deleted successfully.");
      },
      error => console.log(error)
    );
  }

  classMethod(agent) {
    return "method_" + agent.method.toLowerCase();
  }

}
