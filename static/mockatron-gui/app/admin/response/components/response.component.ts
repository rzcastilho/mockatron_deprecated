import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseService} from '../services/response.service';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../../../common/services/message.service';

@Component({
  selector: 'response',
  templateUrl: 'app/admin/response/components/response.component.html'
})
export class ResponseComponent {

  private sub: Subscription;

  responses: any;
  selectedResponse: any;

  constructor(private responseService: ResponseService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let agentOperationPath = /^(agent|operation)/g;
        if (agentOperationPath.test(this.route.snapshot.routeConfig.path)) {
          if (this.route.snapshot.routeConfig.path.startsWith('agent')) {
            this.responseService.getByAgent(+params['id']).subscribe(
              responses => this.responses = responses,
              error => console.log(error)
            );
          }
          else {
            this.responseService.getByOperation(+params['id']).subscribe(
              responses => this.responses = responses,
              error => console.log(error)
            );
          }
        }
        else {
          this.responseService.getAll().subscribe(
            responses => this.responses = responses,
            error => console.log(error)
          );
        }
      }
    );
  }

  select(response: any) {
    this.selectedResponse = response;
  }

  delete(response: any) {
    this.responseService.delete(response).subscribe(
      res => {
        let index = this.responses.indexOf(response);
        if (index >= 0) {
          this.responses.splice(index, 1);
        }
        this.messageService.success("Response deleted successfully.");
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
