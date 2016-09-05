import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ResumeService {

  constructor(private http: Http) { }

  resume() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers, body: {} });
    return this.http.get('/mockatron/api/resume/', options)
      .map(res => res.json())
      .catch(error => this.handleError(error, "Error getting resume."));
  }

  private handleError (error: Response, message: string) {
    console.log(error);
    return Observable.throw({message: message, detail: error || 'Server error'});
  }

}
