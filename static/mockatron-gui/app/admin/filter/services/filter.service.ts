import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { MessageService } from '../../../common/services/message.service';

@Injectable()
export class FilterService {

  constructor(private http: Http, private messageService: MessageService) { }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/filters/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting responses."));
  }

  getByAgent(agent_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/agents/' + agent_id + '/filters/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting responses."));
  }

  getByOperation(operation_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/operations/' + operation_id + '/filters/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting responses."));
  }

  get(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/filters/' + id, options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting filter."));
  }

  update(filter: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    if (filter.operation != null) {
      filter.agent = null;
    }
    return this.http.put('/mockatron/api/filters/' + filter.id, JSON.stringify(filter), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error updating filter."));
  }

  create(filter: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    if (filter.operation != null) {
      filter.agent = null;
    }
    return this.http.post('/mockatron/api/filters/', JSON.stringify(filter), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error creating filter."));
  }

  delete(filter: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.delete('/mockatron/api/filters/' + filter.id, options)
      .catch(error => this.handleError(error, "Error deleting filter."));
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
