import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import { Hole } from '../models';
import { HttpClient } from './http-client.service';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';


const MAX_THUMBS_UP = 24;
const MAX_JAMS = 7062;
const MAX_ROUTES = 251;

@Injectable()
export class HoleService {

  private holesChangedSource = new Subject<Hole[]>();

  holesChanged$ = this.holesChangedSource.asObservable();

  private holeClickedSource = new Subject<Hole>();

  holeClicked$ = this.holeClickedSource.asObservable();

  constructor(private http: HttpClient) { }

  getHoles(lat1: number, long1: number, lat2: number, long2: number) {
    //return this.getMockHoles();
    let params: URLSearchParams = new URLSearchParams();
    params.set('lat1', lat1+'');
    params.set('long1', long1+'');
    params.set('lat2', lat2+'');
    params.set('long2', long2+'');
    return this.http.get('/api/holes', params)
      .map(res => res.json())
      .map(this.parseHoles)
      .map((holes: Hole[]) => {
        let _holes = [];
        let ratio = Math.floor(holes.length/100) + 1;
        for( let i = 0; i < holes.length; i += ratio) {
          _holes.push(holes[i]);
        }
        //console.log(_holes);
         //_holes = holes.slice(0, 40);
        this.holesChangedSource.next(_holes);
        return _holes;
      });
  }

  getHoleRoutes(hole: Hole) {
    
    return this.http.get(`/api/holes/${hole.id_hole}/routes`)
      .map(res => res.json());
  }


  private parseHoles(payload: any):Hole[] {
    let maxThumbsUp = 0;
    console.log(payload);
    let holes = [];
    payload.forEach(hole => {
      if(+hole.indicator > maxThumbsUp) {
        maxThumbsUp = hole.indicator;
      }
      let newHole = new Hole(hole._id, 
        hole.id_hole,
        hole.street, 
        hole.indicator, 
        hole.thumbsup/MAX_THUMBS_UP, 
        hole.indicator/MAX_JAMS, 
        hole.num_rutas/MAX_ROUTES,
        hole.location.y, 
        hole.location.x);
      holes.push(newHole);
    });
    console.log(maxThumbsUp);
    //this.holesChangedSource.next(holes);
    return holes;
  }
  

  // private getMockHoles() {
  //   let mock = [{ id: '1', street: '', indicator: 10, latitude: 4.779973, longitude: -74.041457 },
  //     { id: '2', street: '', indicator: 15, latitude: 4.812419, longitude: -74.03602 },
  //     { id: '3', street: '', indicator: 29, latitude: 4.755245, longitude: -74.045548 },
  //     { id: '4', street: '', indicator: 40, latitude: 4.755212, longitude: -74.045555 },
  //     { id: '5', street: '', indicator: 54, latitude: 4.812386, longitude: -74.036025 },
  //     { id: '6', street: '', indicator: 34, latitude: 4.692524, longitude: -74.056154 },
  //     { id: '7', street: '', indicator: 95, latitude: 4.755188, longitude: -74.04556}];
  //   let holes = mock.map(point => {
  //     return new Hole(point.id, point.street, point.indicator, point.latitude, point.longitude);
  //   });
  //   return Observable.of(holes).delay(1000);
  // }

  openInfoWindow(hole: Hole) {
    this.holeClickedSource.next(hole);
  }

}


 
