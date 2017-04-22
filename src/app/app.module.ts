import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';

const GOOGLE_API_KEYS = 'AIzaSyA5_SwR4FePB1SzZ7Mo2wsb_zmpb-vEW1Y';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEYS
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
