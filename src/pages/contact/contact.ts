import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AddPayementPage } from "../add-payement/add-payement";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { GeneralProvider } from "../../providers/general/general";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  payementList: any;
  items: Array<any> = [];
  condidatC;
  ListCondidat: any[];

  constructor(
    public condidat: CondidatProvider,
    public navCtrl: NavController,
    public afDB: AngularFireDatabase,
    public navParams: NavParams,
    public general: GeneralProvider,
    public sanitizer: DomSanitizer
  ) {
    this.condidatC = this.condidat.getCondidatCourant();
    console.log(this.condidat.getCondidatCourant());

    this.initializeItems();
  }

  initializeItems() {
    console.log(this.condidat.getCondidatCourant());

    this.afDB
      .list("payement")
      .valueChanges()
      .subscribe(data => {
        this.payementList = data as Array<any>;
        console.log(this.payementList);

        this.payementList = this.payementList.filter(
          word => word.condidat + "" == this.condidatC + ""
        );
        console.log(this.payementList);

        this.items = this.payementList;
      });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  setDefaultPic(item: any) {
    this.items[this.items.indexOf(item)].photo = "assets/imgs/user.png";
  }
}
