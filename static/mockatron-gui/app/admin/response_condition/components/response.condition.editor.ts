import {Component, Input, OnInit} from '@angular/core';
import {ResponseConditionService} from '../services/response.condition.service';
import {TruncateStringPipe} from '../../../common/pipes/truncate.string.pipe';

@Component({
  selector: 'response-condition-editor',
  pipes: [TruncateStringPipe],
  templateUrl: 'app/admin/response_condition/components/response.condition.editor.html'
})
export class ResponseConditionEditorComponent {

  @Input() filterId: number;
  @Input() modalName: string;

  response_conditions: any = [];
  edit_mode: boolean = false;
  current_response_condition: any;

  constructor(private responseConditionService: ResponseConditionService) { }

  private toggleMode() {
    this.edit_mode = !this.edit_mode;
  }

  private refreshData() {
    this.responseConditionService.getByFilter(this.filterId).subscribe(
      response_conditions => this.response_conditions = response_conditions,
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.refreshData();
  }

  select(response_condition: any) {
    this.current_response_condition = response_condition;
  }

  edit(response_condition: any) {
    this.current_response_condition = response_condition;
    this.toggleMode();
  }

  create() {
    this.current_response_condition = {};
    this.toggleMode();
  }

  cancel() {
    this.current_response_condition = null;
    this.toggleMode();
    return null;
  }

  save(response_condition: any) {
    response_condition.filter = this.filterId;
    if (response_condition.id) {
      this.responseConditionService.update(response_condition).subscribe(
        response_condition => this.refreshData(),
        error => console.log(),
        () => this.toggleMode()
      );
    }
    else {
      this.responseConditionService.create(response_condition).subscribe(
        response_condition => this.refreshData(),
        error => console.log(),
        () => this.toggleMode()
      );
    }
  }

  delete(response_condition: any) {
    this.responseConditionService.delete(response_condition).subscribe(
      res => this.refreshData(),
      error => console.log(error)
    );
  }

}
