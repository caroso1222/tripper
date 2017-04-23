import { Component, OnInit, Input } from '@angular/core';
import { Hole } from '../../models/hole';
import { HoleService } from '../../services/hole.service';

@Component({
  selector: 'holes-list',
  templateUrl: './holes-list.component.html',
  styleUrls: ['./holes-list.component.scss']
})
export class HolesListComponent implements OnInit {

  @Input()
  holes: Hole[] = [];

  constructor(private holeService: HoleService) { }

  ngOnInit() {
    this.holeService.holesChanged$.subscribe(holes => {
      console.log(holes);
      this.holes = holes;
      this.holes.forEach(hole => hole.the_indicator = this.calculateIndicator(hole))
      this.holes.sort((a,b)=>b.the_indicator - a.the_indicator);
    })
  }

  getHoleColor(hole:Hole) {
    if (hole.the_indicator > 0.6) {
      return 'high';
    } else if (hole.the_indicator > 0.35) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  onHoleClicked(hole: Hole) {
    this.holeService.openInfoWindow(hole);
  }

  calculateIndicator(hole: Hole) {
    return 0.6*hole.numRoutes + 0.1*hole.jams + 0.3*hole.thumbsUp;
  }

}
