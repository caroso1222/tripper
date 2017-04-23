import { Injectable } from '@angular/core';
import { JAM_1, JAM_2 } from './jams.mock';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from './http-client.service';


@Injectable()
export class JamService {

  constructor(private http: HttpClient) { }

  getJams() {
    let jams = {
      jam1: JAM_1,
      jam2: JAM_2
    }

    return this.http.get('/api/jams')
      .map(res => res.json());


    //return Observable.of(jams).delay(300);
  }

}
