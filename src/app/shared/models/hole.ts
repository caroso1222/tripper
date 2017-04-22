export class Hole {
  location: Location;
  date: Date;
  street: string;
}

export interface Location {
  x: number;
  y: number;
}