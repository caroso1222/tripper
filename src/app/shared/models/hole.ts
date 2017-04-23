import { Location } from './location';

export class Hole {
  location: Location;
  routes;
  the_indicator: number;
  constructor(public id: string, 
    public id_hole: string,
    public street: string,
    public indicator: number, 
    public thumbsUp: number,
    public jams: number,
    public numRoutes: number,
    latitude: number, 
    longitude: number) {
    this.location = { latitude: latitude, longitude: longitude }
  }

  get numRoutesNotNormalized() {
    return Math.round(this.numRoutes*251);
  }

}