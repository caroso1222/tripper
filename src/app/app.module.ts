import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HoleService } from './shared/services/hole.service';
import { RouteService } from './shared/services/route.service';
import { JamService } from './shared/services/jam.service';
import { MapComponent } from './shared/components/map/map.component';
import { HttpClient } from './shared/services/http-client.service';
import { HolesListComponent } from './shared/components/holes-list/holes-list.component';
import { SettingsModalComponent } from './shared/components/settings-modal/settings-modal.component';

const GOOGLE_API_KEYS = 'AIzaSyA5_SwR4FePB1SzZ7Mo2wsb_zmpb-vEW1Y';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HolesListComponent,
    SettingsModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEYS
    })
  ],
  providers: [HoleService, HttpClient, RouteService, JamService],
  entryComponents: [SettingsModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
