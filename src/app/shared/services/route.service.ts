import { Injectable } from '@angular/core';
import { HttpClient } from './http-client.service';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { ROUTE_1, ROUTE_2 } from './routes.mock';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RouteService {

  constructor(private http: HttpClient) { }

  _getRoute() {
    let obj = {
      route1: ROUTE_1,
      route2: ROUTE_2
    }
    return Observable.of(obj).delay(100);
  }

  getRoute(idRoute) {
    return this.http.get(`/api/routes/${idRoute}`)
      .map(res => res.json());
  } 

  getRouteShape(route_id) {
    return this.http.get(`/api/shapes/routes/${route_id}`)
      .map(res => res.json());
  }

}
