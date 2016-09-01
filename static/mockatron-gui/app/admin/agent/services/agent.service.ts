import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { MessageService } from '../../../common/services/message.service';

@Injectable()
export class AgentService {

  constructor(private http: Http, private messageService: MessageService) { }

  getAll() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/agents/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting agents."));
  }

  get(id: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.get('/mockatron/api/agents/' + id, options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting agent."));
  }

  update(agent: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put('/mockatron/api/agents/' + agent.id, JSON.stringify(agent), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error updating agent."));
  }

  create(agent: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/mockatron/api/agents/', JSON.stringify(agent), options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error creating agent."));
  }

  delete(agent: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: { } });
    return this.http.delete('/mockatron/api/agents/' + agent.id, options)
      .catch(error => this.handleError(error, "Error deleting agent."));
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
