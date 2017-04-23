import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpClient {

  private token: string;

  constructor(private http: Http) {}

  addTokenToHeader(headers: Headers) {
    let token = localStorage.getItem('auth_token') || '';
    headers.append('x-access-token', token || ''); 
  }

  get(url, search?) {
    return this.http.get(url, {
      headers: this.getHeadersWithToken(),
      search: search
    }).catch(this.catchErrors);
  }

  post(url, data) {
    return this.http.post(url, data, {
      headers: this.getHeadersWithToken()
    }).catch(this.catchErrors);
  }

  delete(url) {
    return this.http.delete(url, {
      headers: this.getHeadersWithToken()
    }).catch(this.catchErrors);
  }

  put(url, data) {
    return this.http.put(url, data, {
      headers: this.getHeadersWithToken(),
    }).catch(this.catchErrors);
  }

  setToken(token: string) {
    this.token = token;
  }

  catchErrors(error: Response) {
    // logout if token expired or not authorized
    if(error.status == 401 || error.status === 403) {
      this.token = undefined;
      //localStorage.removeItem('auth_token');
      //window.location.href = "/login";
      return Observable.throw(error);
    }
  }

  getHeadersWithToken(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let token = localStorage.getItem('auth_token') || '';
    headers.append('x-access-token', token); 
    return headers;
  }
}