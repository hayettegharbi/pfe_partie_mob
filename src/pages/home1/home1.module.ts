import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { Home1Page } from "./home1";

import { CalendarComponent } from "ap-angular2-fullcalendar/src/calendar/calendar";

@NgModule({
  declarations: [Home1Page, CalendarComponent],
  imports: [IonicPageModule.forChild(Home1Page)]
})
export class HomePageModule {}
