import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {MessageService} from '../../../common/services/message.service';

@Injectable()
export class RequestConditionService {

  constructor(private http: Http, private messageService: MessageService) { }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/request_conditions/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting request conditions."));
  }

  getByFilter(filter_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/filters/' + filter_id + '/request_conditions/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting request conditions."));
  }

  update(request_condition: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put('/mockatron/api/request_conditions/' + request_condition.id, JSON.stringify(request_condition), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error updating request condition."));
  }

  create(request_condition: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/mockatron/api/request_conditions/', JSON.stringify(request_condition), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error creating request condition."));
  }

  delete(request_condition: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.delete('/mockatron/api/request_conditions/' + request_condition.id, options)
      .catch(error => this.handleError(error, "Error deleting request condition."));
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
