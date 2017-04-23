import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Hole } from '../../models';
import { HoleService } from '../../services/hole.service';
import { RouteService } from '../../services/route.service';
import { JamService } from '../../services/jam.service';
import { LatLngBounds, SebmGoogleMapMarker, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChildren(SebmGoogleMapInfoWindow)
  infoWindows:QueryList<SebmGoogleMapInfoWindow>;
  
  showJams: boolean = false;

  holes: Hole[] = [];

  route: any;
  route2: any;

  jam1: any;
  jam2: any;

  maxJam: number = 0;
  minJam: number = 40000000;



  jams: any[] = [
      { polygon: [{ lat: 0,  lng: 10 }] }
  ];

  bounds: LatLngBounds;

  mapCenter:any = {
    lat: 4.674880,
    lng:  -74.098822
  };

  boundChangeDebouncer: Subject<LatLngBounds> = new Subject();

  constructor(private holeService: HoleService, 
    private routeService: RouteService,
    private jamService: JamService) { }

  ngOnInit() {
    this.boundChangeDebouncer
      .debounceTime(100)
      .subscribe((bounds: LatLngBounds) => {
        if(this.holes.length === 0) {
        this.getHoles(bounds);
        }
      })

      let marker: SebmGoogleMapMarker;
      //market

    // this.routeService.getRoute().subscribe(routes => {
    //   this.route = routes.route1;
    //   this.route2 = routes.route2;
    // });

    this.jamService.getJams().subscribe(jams => {
      this.jams = jams.map(jam => {
        if(jam.col > this.maxJam) {
          this.maxJam = jam.col
        }
        if(jam.col < this.minJam) {
          this.minJam = jam.col;
        }
        return {
          polygon: jam.polygon.map(point => {
            return {
              lat: +point[0],
              lng: +point[1]
            }
          }),
          col: jam.col
        }
      });
    });

    this.holeService.holeClicked$.subscribe(hole => {
      let clicked = this.infoWindows.filter(info => {
        return info.hostMarker.latitude === hole.location.latitude && info.hostMarker.longitude === hole.location.longitude;
      })[0];
      if(clicked) {
        clicked.open();
        this.paintRoute(hole);
      }
    });
  }

  onBoundsChange(bounds:LatLngBounds) {
    this.boundChangeDebouncer.next(bounds);
  }

  getJamColor(jam) {
    let idx = (jam.col - this.minJam)/(this.maxJam - this.minJam);
    if(idx > 0.8) {
      return 'red'
    } else if(idx > 0.6) {
      return '#ff6300'
    } else if(idx > 0.4) {
      return '#ffaa00'
    } else if(idx > 0.2) {
      return '#fffc00'
    } else {
      return '#3cde4c'
    }
  }

  onMarkerClick(hole: Hole) {
    console.log({hole});
    this.paintRoute(hole);
  }

  paintRoute(hole:Hole) {
    this.holeService.getHoleRoutes(hole).subscribe( routes => {
      if(routes.length) {
        hole.routes = routes[0].routes;
        this.getRoute(hole.routes[1])
      }
    });
  }

  getRoute(routeId) {
    console.log(routeId);
    this.routeService.getRoute(routeId).subscribe(res => {
      console.log(res);
      if(res.length) {
        let route_id = res[0].route_id;
        this.getRouteShape(route_id);
      }
    })
  }

  getRouteShape(routeId) {
    this.routeService.getRouteShape(routeId).subscribe(res => {
      console.log(res);
      if(res.length) {
        this.route = res.map(point => {
          return {
            latitude: +point.shape_pt_lat,
            longitude: +point.shape_pt_lon
          }
        });
      }
    });
  }


  getRandom() {
    return Math.floor(Math.random()*15);
  }

  getHoles(bounds: LatLngBounds) {
    let northEast = bounds.getNorthEast();
    let southWest = bounds.getSouthWest();
    let lat1 = northEast.lat();
    let long1 = northEast.lng();
    let lat2 = southWest.lat();
    let long2 = southWest.lng();
    this.holeService.getHoles(lat1, long1, lat2, long2).subscribe(holes => {
      this.holes = holes;
    });
  }



  getHoleColor(hole:Hole) {
    if (hole.indicator > 0.8) {
      return 'high';
    } else if (hole.indicator > 0.4) {
      return 'medium';
    } else {
      return 'low';
    }
  }

}
