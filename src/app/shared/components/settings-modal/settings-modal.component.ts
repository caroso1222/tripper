import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  routeFactor: number = 0.5;
  reportsFactor: number = 0.15;
  jamFactor: number = 0.1;
  accidentFactor: number = 0.25;

  constructor(private modal: MdDialogRef<SettingsModalComponent>) { }

  ngOnInit() {
  }

  getFactorSum() {
    return +(this.routeFactor + this.reportsFactor + this.jamFactor + this.accidentFactor).toFixed(2);
  }

  save() {
    this.modal.close();
  }

}
