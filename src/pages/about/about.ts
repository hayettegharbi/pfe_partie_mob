import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { GeneralProvider } from "../../providers/general/general";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { AngularFireDatabase } from "@angular/fire/database";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { DomSanitizer } from "@angular/platform-browser";
import * as firebase from "firebase";
import { LoginPage } from "../login/login";
@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  @ViewChild("text") text: any;

  condidatC;
  commList: any;
  items: Array<any> = [];
  ListCondidat: any[];
  commentaires: Array<any>;

  constructor(
    public condidat: CondidatProvider,
    public navCtrl: NavController,
    public MoniteurProvider: MoniteurProvider,
    public navParams: NavParams,
    public general: GeneralProvider,
    public afDB: AngularFireDatabase,
    public sanitizer: DomSanitizer
  ) {
    this.condidatC = this.condidat.getCondidatCourant();
    this.init();
  }

  init() {
    this.afDB
      .list("commentaires")
      .valueChanges()
      .subscribe(data => {
        this.commList = data as Array<any>;
        this.commList.filter(word => word.condidat + "" == this.condidatC);

        this.condidat.getListCondidat().then(data => {
          this.ListCondidat = data as Array<any>;
          this.ListCondidat = this.ListCondidat.filter(
            word => word.condidat + "" == this.condidatC
          );

          this.items = [];
          for (let i of this.commList) {
            let condidat = this.ListCondidat[Number(i.condidat)];

            let object = {
             // image: condidat.photo,
             // name: condidat.nom + " " + condidat.prenom,
              start: i.start,
              end: i.end,
              comment: i.commentaire,
              moniteur: i.moniteur,
              condidat: i.condidat,
              //response: i.response
            };

            this.items.push(object);
          }
        });
      });
  }

  setDefaultPic(item: any) {
    this.items[this.items.indexOf(item)].photo = "assets/imgs/user.png";
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
