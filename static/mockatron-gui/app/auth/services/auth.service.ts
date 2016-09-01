import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { MessageService } from '../../common/services/message.service';

@Injectable()
export class AuthService {

  constructor(private http: Http, private messageService: MessageService) { }

  login(username: String, password: String) {
    let body = JSON.stringify({username: username, password: password});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/mockatron/api/token/', body, options)
      .map(res => res.json())
      .map(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        return res;
      })
      .catch(error => this.handleError(error, "Sign in error."));
  }

  signup(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/mockatron/api/signup/', body, options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Sign up error."));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  private handleError (error: Response, message: string) {
    return Observable.throw(this.messageService.error(message, error.json().message || error.json().error || 'Server error'));
  }

}
