import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { MessageService } from '../../../common/services/message.service';

@Injectable()
export class OperationService {

  constructor(private http: Http, private messageService: MessageService) { }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/operations/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting operations."));
  }

  getByAgent(agent_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/agents/' + agent_id + '/operations/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting operations."));
  }

  get(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/operations/' + id, options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting operation."));
  }

  update(operation: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put('/mockatron/api/operations/' + operation.id, JSON.stringify(operation), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error updating operation."));
  }

  create(operation: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/mockatron/api/operations/', JSON.stringify(operation), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error creating operation."));
  }

  delete(operation: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.delete('/mockatron/api/operations/' + operation.id, options)
      .catch(error => this.handleError(error, "Error deleting operation."));
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
