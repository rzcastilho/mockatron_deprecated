import {Component, Input, OnInit} from '@angular/core';
import {RequestConditionService} from '../services/request.condition.service';
import {TruncateStringPipe} from '../../../common/pipes/truncate.string.pipe';

@Component({
  selector: 'request-condition-editor',
  pipes: [TruncateStringPipe],
  templateUrl: 'app/admin/request_condition/components/request.condition.editor.html'
})
export class RequestConditionEditorComponent {

  @Input() filterId: number;
  @Input() modalName: string;

  request_conditions: any = [];
  edit_mode: boolean = false;
  current_request_condition: any;

  constructor(private requestConditionService: RequestConditionService) { }

  private toggleMode() {
    this.edit_mode = !this.edit_mode;
  }

  private refreshData() {
    this.requestConditionService.getByFilter(this.filterId).subscribe(
      request_conditions => this.request_conditions = request_conditions,
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.refreshData();
  }

  select(request_condition: any) {
    this.current_request_condition = request_condition;
  }

  edit(request_condition: any) {
    this.current_request_condition = request_condition;
    this.toggleMode();
  }

  create() {
    this.current_request_condition = {};
    this.toggleMode();
  }

  cancel() {
    this.current_request_condition = null;
    this.toggleMode();
    return null;
  }

  save(request_condition: any) {
    request_condition.filter = this.filterId;
    if (request_condition.id) {
      this.requestConditionService.update(request_condition).subscribe(
        request_condition => this.refreshData(),
        error => console.log(),
        () => this.toggleMode()
      );
    }
    else {
      this.requestConditionService.create(request_condition).subscribe(
        request_condition => this.refreshData(),
        error => console.log(),
        () => this.toggleMode()
      );
    }
  }

  delete(request_condition: any) {
    this.requestConditionService.delete(request_condition).subscribe(
      res => this.refreshData(),
      error => console.log(error)
    );
  }

}
