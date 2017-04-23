import { Component } from '@angular/core';
import { Hole } from './shared/models';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SettingsModalComponent } from './shared/components/settings-modal/settings-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  lat: number = 4.674880;
  lng: number =  -74.098822;

  holes: Hole[] = [];

  constructor(public dialog: MdDialog) { }

  openDialog() {
    this.dialog.open(SettingsModalComponent);
  }
}
