import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as $ from "jquery";
import { AjouterHeurePage } from "../ajouter-heure/ajouter-heure";
import { GeneralProvider } from "../../providers/general/general";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { RemarquePage } from "../remarque/remarque";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  calendarOptions: any;
  events: any;
  moniteurC;

  constructor(
    public navCtrl: NavController,
    public MoniteurProvider: MoniteurProvider,
    public navParams: NavParams,
    public general: GeneralProvider
  ) {
    this.moniteurC = this.MoniteurProvider.getMoniteurCourant();
  }

  ngAfterViewInit() {
    this.calendarOptions = {
      header: {
        left: "title",
        right: "month,agendaWeek,agendaDay,agendaFourDay,"
      },
      footer: {
        right: "today prev,next"
      },
      views: {
        agendaFourDay: {
          type: "listYear",
          buttonText: "All"
        }
      },
      // theme:'jquery-ui',
      height: "parent",
      fixedWeekCount: false,
      defaultDate: Date(),
      editable: true,
      allDay: true,
      eventClick: event => {
        this.navCtrl.push(RemarquePage, {
          event: event
        });
      },
      dayClick: (date, jsEvent, view, resourceObj) => {
        this.navCtrl.push(AjouterHeurePage, {
          date: date.format()
        });
      },
      eventLimit: true // allow "more" link when too many events
    };
    this.general.getListHours().then(data => {
      this.events = data;
      if (this.events === null) {
        this.events = [];
        this.calendarOptions.events = [];

        $("#myCalendar").fullCalendar("renderEvents", this.events, true);
      } else {
        const result = this.events.filter(
          word => word.moniteur + "" == this.moniteurC
        );

        this.calendarOptions.events = result;

        console.log(result);
        $("#myCalendar").fullCalendar("renderEvents", result, true);
      }
    });
  }
}
