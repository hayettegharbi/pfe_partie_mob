import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { CalendarComponent } from "ap-angular2-fullcalendar/src/calendar/calendar";

@NgModule({
  declarations: [
    HomePage,
    CalendarComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    
  ],
})
export class HomePageModule {}
