import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilterService} from '../services/filter.service';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../../../common/services/message.service';

@Component({
  selector: 'filter',
  templateUrl: 'app/admin/filter/components/filter.component.html'
})
export class FilterComponent {

  private sub: Subscription;

  filters: any;
  selectedFilter: any;

  constructor(private filterService: FilterService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        let agentOperationPath = /^(agent|operation)/g;
        if (agentOperationPath.test(this.route.snapshot.routeConfig.path)) {
          if (this.route.snapshot.routeConfig.path.startsWith('agent')) {
            this.filterService.getByAgent(+params['id']).subscribe(
              filters => this.filters = filters,
              error => console.log(error)
            );
          }
          else {
            this.filterService.getByOperation(+params['id']).subscribe(
              filters => this.filters = filters,
              error => console.log(error)
            );
          }
        }
        else {
          this.filterService.getAll().subscribe(
            filters => this.filters = filters,
            error => console.log(error)
          );
        }
      }
    );
  }

  select(filter: any) {
    this.selectedFilter = filter;
  }

  delete(filter: any) {
    this.filterService.delete(filter).subscribe(
      res => {
        let index = this.filters.indexOf(filter);
        if (index >= 0) {
          this.filters.splice(index, 1);
        }
        this.messageService.success("Filter deleted successfully.");
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
