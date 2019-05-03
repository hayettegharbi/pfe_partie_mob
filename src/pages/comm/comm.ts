import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GeneralProvider } from "../../providers/general/general";
import * as firebase from "firebase";
/**
 * Generated class for the CommPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-comm",
  templateUrl: "comm.html"
})
export class CommPage {
  event;
  comment;
  commentaires: any;
  constructor(
    public navCtrl: NavController,
    public general: GeneralProvider,
    public navParams: NavParams
  ) {
    this.event = this.navParams.get("event");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CommPage");
  }

  validate() {
    let object = {
      start: this.event.start._i,
      end: this.event.end._i,
      moniteur: this.event.moniteur,
      condidat: this.event.condidat,
      commentaire: this.comment
    };

    console.log(object);
    this.general.getListCommantaires().then(data => {
      this.commentaires = data;
      console.log(this.commentaires);
      if (this.commentaires === null) {
        this.commentaires = [];
      } else {
        this.commentaires = data;
      }
      this.commentaires.push(object);
      console.log(this.commentaires);

      firebase
        .database()
        .ref("/commentaires")
        .set(this.commentaires);
      this.navCtrl.pop();
    });
  }
}
