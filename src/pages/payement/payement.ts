import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AddPayementPage } from "../add-payement/add-payement";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { GeneralProvider } from "../../providers/general/general";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "page-payement",
  templateUrl: "payement.html"
})
export class PayementPage {
  payementList: any;
  items: Array<any> = [];
  moniteurC;
  ListCondidat: any[];

  constructor(
    public condidat: CondidatProvider,
    public navCtrl: NavController,
    public afDB: AngularFireDatabase,
    public navParams: NavParams,
    public MoniteurProvider: MoniteurProvider,
    public general: GeneralProvider,
    public sanitizer: DomSanitizer
  ) {
    this.moniteurC = this.MoniteurProvider.getMoniteurCourant();
    this.initializeItems();
  }

  initializeItems() {
    this.afDB
      .list("payement")
      .valueChanges()
      .subscribe(data => {
        this.payementList = data as Array<any>;
        this.payementList.filter(word => word.moniteur + "" == this.moniteurC);
        this.condidat.getListCondidat().then(data => {
          this.ListCondidat = data as Array<any>;
          this.ListCondidat.filter(
            word => word.moniteur + "" == this.moniteurC
          );
          this.items = [];
          for (let i of this.payementList) {
            let condidat = this.ListCondidat[Number(i.condidat)];

            let object = {
              image: condidat.photo,
              name: condidat.nom + " " + condidat.prenom,
              date: i.date,
              montant: i.montant
            };

            this.items.push(object);
          }
          console.log(this.items);
        });
      });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar

    this.afDB
      .list("payement")
      .valueChanges()
      .subscribe(data => {
        this.payementList = data as Array<any>;
        this.payementList.filter(word => word.moniteur + "" == this.moniteurC);
        this.condidat
          .getListCondidat()
          .then(data => {
            this.ListCondidat = data as Array<any>;
            this.ListCondidat=this.ListCondidat.filter(
              word => word.moniteur + "" == this.moniteurC
            );
            this.items = [];
            for (let i of this.payementList) {
              let condidat = this.ListCondidat[Number(i.condidat)];

              let object = {
              //  image: condidat.photo,
                name: condidat.nom + " " + condidat.prenom,
                date: i.date,
                montant: i.montant
              };

              this.items.push(object);
            }
            console.log(this.items);
          })
          .then(data => {
            console.log(data);

            const val = ev.target.value;

            // if the value is an empty string don't filter the items
            if (val && val.trim() != "") {
              this.items = this.items.filter(item => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
              });
            }
          });
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PayementPage");
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  addPayement() {
    this.navCtrl.push(AddPayementPage);
  }

/*  setDefaultPic(item: any) {
    this.items[this.items.indexOf(item)].photo = "assets/imgs/user.png";
  }*/
}
