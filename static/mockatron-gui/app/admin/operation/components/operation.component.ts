import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TruncateStringPipe} from '../../../common/pipes/truncate.string.pipe';
import {OperationService} from '../services/operation.service';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../../../common/services/message.service';

@Component({
  selector: 'operation',
  pipes: [TruncateStringPipe],
  templateUrl: 'app/admin/operation/components/operation.component.html'
})
export class OperationComponent {

  private sub: Subscription;

  operations: any;
  selectedOperation: any;

  constructor(private operationService: OperationService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let agentPath = /^agent/g;
        if (agentPath.test(this.route.snapshot.routeConfig.path)) {
          this.operationService.getByAgent(+params['id']).subscribe(
            operations => this.operations = operations,
            error => console.log(error)
          );
        }
        else {
          this.operationService.getAll().subscribe(
            operations => this.operations = operations,
            error => console.log(error)
          );
        }
      }
    );
  }

  select(operation: any) {
    this.selectedOperation = operation;
  }

  delete(operation: any) {
    this.operationService.delete(operation).subscribe(
      res => {
        let index = this.operations.indexOf(operation);
        if (index >= 0) {
          this.operations.splice(index, 1);
        }
        this.messageService.success("Operation deleted successfully.");
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
