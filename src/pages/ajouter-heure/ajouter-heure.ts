import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { GeneralProvider } from "../../providers/general/general";
import * as firebase from "firebase";
import { TabsPage } from "../tabs/tabs";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { AlertController } from "ionic-angular";
//import {Tabs1Page} from "../tabs1/tabs1";


/**
 * Generated class for the AjouterHeurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-ajouter-heure",
  templateUrl: "ajouter-heure.html"
})
export class AjouterHeurePage {
  date: any;
  gender: any;
  moniteurs: Array<any> = [];
  start: any;
  end: any;
  hours: any;
  moniteurC;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public general: GeneralProvider,
    public condidat: CondidatProvider,
    public MoniteurProvider: MoniteurProvider
  ) {
    this.moniteurC = this.MoniteurProvider.getMoniteurCourant();

    this.date = this.navParams.get("date");
    this.condidat.getListCondidat().then(data => {
      console.log(data);
      this.moniteurs = data as Array<any>;

      this.moniteurs = this.moniteurs.filter(word => {
        return (
          (word.moniteur + "")
            .toLowerCase()
            .indexOf((this.moniteurC + "").toLowerCase()) > -1
        );
      });
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AjouterHeurePage");
  }
  // 2016-09-09T16:00:00
  validate() {
    if (this.condidat==undefined||this.start==undefined || this.end==undefined)
    {  let alert=this.alertCtrl.create({
      title: ' Missing infos!',
      buttons: [{
          text: 'OK',
          role: 'confirm' },
          
      ]
  });
  alert.present();}
    else{
    let object = {
      moniteur: this.moniteurC,
      condidat: this.gender,
      title:
        this.moniteurs[this.gender].nom +
        " " +
        this.moniteurs[this.gender].prenom,
      start: this.date + "T" + this.start,
      end: this.date + "T" + this.end,
      color: "black"
    };
    console.log(object);
    console.log(this.start);
    this.general.getListHours().then(data => {
      this.hours = data;
      if (this.hours === null) {
        this.hours = [];
      } else {
        this.hours = data;
      }
      this.hours.push(object);
      firebase
        .database()
        .ref("/heurs")
        .set(this.hours);
      this.navCtrl.setRoot(TabsPage);
    });
  }}
}
