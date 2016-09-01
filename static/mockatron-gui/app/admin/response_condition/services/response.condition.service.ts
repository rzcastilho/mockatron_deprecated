import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {MessageService} from '../../../common/services/message.service';

@Injectable()
export class ResponseConditionService {

  constructor(private http: Http, private messageService: MessageService) { }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/response_conditions/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting response conditions."));
  }

  getByFilter(filter_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/filters/' + filter_id + '/response_conditions/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting response conditions."));
  }

  update(response_condition: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put('/mockatron/api/response_conditions/' + response_condition.id, JSON.stringify(response_condition), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error updating response condition."));
  }

  create(response_condition: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/mockatron/api/response_conditions/', JSON.stringify(response_condition), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error creating response condition."));
  }

  delete(response_condition: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.delete('/mockatron/api/response_conditions/' + response_condition.id, options)
      .catch(error => this.handleError(error, "Error deleting response condition."));
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
