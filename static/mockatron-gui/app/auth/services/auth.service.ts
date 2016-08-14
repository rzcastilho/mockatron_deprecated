import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

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

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  private handleError (error: Response, message: string) {
    return Observable.throw({message: message, detail: error || 'Server error'});
  }

}
