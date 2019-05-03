import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GeneralProvider } from "../../providers/general/general";
import * as firebase from "firebase";
import * as moment from "moment";

/**
 * Generated class for the RemarquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-remarque",
  templateUrl: "remarque.html"
})
export class RemarquePage {
  item: any;
  remarque: any;
  remarques: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public general: GeneralProvider
  ) {
    this.item = this.navParams.get("event");
    console.log(this.item);
  }

  validate() {
    let object = {
      start: moment(this.item.start).format("DD-MM-YYYY-HH:mm"),
      end: moment(this.item.end).format("DD-MM-YYYY-HH:mm"),
      moniteur: this.item.moniteur,
      condidat: this.item.condidat,

      remarque: this.remarque
    };
    console.log(object);
    this.general.getListCommantaires().then(data => {
      this.remarques = data as Array<any>;
      console.log(this.remarques);
      if (this.remarques === null) {
        this.remarques = [];
      } else {
        this.remarques = data as Array<any>;
      }
      this.remarques.push(object);
      console.log(this.remarques);

      firebase
        .database()
        .ref("/remarques")
        .set(this.remarques);
    });
    this.navCtrl.pop();
  }
}
