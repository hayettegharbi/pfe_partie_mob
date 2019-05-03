import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import * as firebase from "firebase";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { GeneralProvider } from "../../providers/general/general";
import { PayementPage } from "../payement/payement";

/**
 * Generated class for the AddPayementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-add-payement",
  templateUrl: "add-payement.html"
})
export class AddPayementPage {
  date: any;
  gender: any;
  moniteurs: Array<any> = [];
  moniteurC;
  montant: any;
  tab: any;

  constructor(
    public navCtrl: NavController,
    public condidat: CondidatProvider,
    public navParams: NavParams,
    public MoniteurProvider: MoniteurProvider,
    public general: GeneralProvider
  ) {
    this.moniteurC = this.MoniteurProvider.getMoniteurCourant();

    this.condidat.getListCondidat().then(data => {
      console.log(data);
      this.moniteurs = data as Array<any>;
      console.log(this.moniteurs);
      console.log(this.moniteurC);

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
    console.log("ionViewDidLoad AddPayementPage");
  }

  validate() {
    let object = {
      condidat: this.gender,
      moniteur: this.MoniteurProvider.getMoniteurCourant(),
      date: this.date,
      montant: this.montant
    };
    console.log(object);
    this.general.getListPayement().then(data => {
      this.tab = data;
      if (this.tab === null) {
        this.tab = [];
      } else {
        this.tab = data;
      }
      this.tab.push(object);
      firebase
        .database()
        .ref("/payement")
        .set(this.tab);
      this.navCtrl.pop();
    });
  }
}
