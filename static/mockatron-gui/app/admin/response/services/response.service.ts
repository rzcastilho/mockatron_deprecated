import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { MessageService } from '../../../common/services/message.service';

@Injectable()
export class ResponseService {

  constructor(private http: Http, private messageService: MessageService) { }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/responses/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting responses."));
  }

  getByAgent(agent_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/agents/' + agent_id + '/responses/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting responses."));
  }

  getByOperation(operation_id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/operations/' + operation_id + '/responses/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting responses."));
  }

  get(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/responses/' + id, options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting response."));
  }

  update(response: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    if (response.operation != null) {
      response.agent = null;
    }
    return this.http.put('/mockatron/api/responses/' + response.id, JSON.stringify(response), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error updating response."));
  }

  create(response: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    if (response.operation != null) {
      response.agent = null;
    }
    return this.http.post('/mockatron/api/responses/', JSON.stringify(response), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error creating response."));
  }

  delete(response: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.delete('/mockatron/api/responses/' + response.id, options)
      .catch(error => this.handleError(error, "Error deleting response."));
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
