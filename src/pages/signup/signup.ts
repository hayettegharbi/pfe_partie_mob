import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import * as firebase from "firebase";
import { CondidatProvider } from "../../providers/condidat/condidat";
import { MoniteurProvider } from "../../providers/moniteur/moniteur";
import { AlertController } from "ionic-angular";
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  object: any;
  nom: any;
  prenom: any;
  photo: any;
  password: any;
  phone: any;
  fileIsUploading = false;
  fileUploaded = false;
  moniteurs: any;
  condidats: any;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public CondidatProvider: CondidatProvider,
    public MoniteurProvider: MoniteurProvider
  ) {
    this.object = this.navParams.get("object");
    console.log(this.object);

    if (this.object.item.nom == undefined) {
      this.nom = "";
    } else {
      this.nom = this.object.item.nom;
    }

    if (this.object.item.prenom == undefined) {
      this.prenom = "";
    } else {
      this.prenom = this.object.item.prenom;
    }

    if (this.object.item.password == undefined) {
      this.password = "";
    } else {
      this.password = this.object.item.password;
    }

    if (this.object.item.photo == undefined) {
      this.photo = "";
    } else {
      this.photo = this.object.item.photo;
    }

    if (this.object.item.phone == undefined) {
      this.phone = "";
    } else {
      this.phone = this.object.item.phone;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Signup");
  }

  signup() {
    if (this.nom == undefined || this.nom == "") {
      let alert=this.alertCtrl.create({
        title: ' Enter your name !',
        buttons: [{
            text: 'OK',
            role: 'confirm' },
            
        ]
    });
    alert.present();
    } else if (this.prenom == undefined || this.prenom == "") {
      let alert=this.alertCtrl.create({
        title: ' Enter your surname !',
        buttons: [{
            text: 'OK',
            role: 'confirm' },
            
        ]
    });
    alert.present();
    } else if (this.password == undefined || this.password == "") {
      let alert=this.alertCtrl.create({
        title: ' Enter your password!',
        buttons: [{
            text: 'OK',
            role: 'confirm' },
            
        ]
    });
    alert.present();
    } else if (this.phone == undefined || this.phone == "") {
      let alert=this.alertCtrl.create({
        title: ' Enter your phone number !',
        buttons: [{
            text: 'OK',
            role: 'confirm' },
            
        ]
    });
    alert.present();
    } else if (this.photo == undefined || this.photo == "") {
      let alert=this.alertCtrl.create({
        title: ' Enter your image!',
        buttons: [{
            text: 'OK',
            role: 'confirm' },
            
        ]
    });
    alert.present();
    } else {
      this.savedata();
    }
    //Api connections
  }

  savedata() {
    if (this.object.genre == "condidat") {
      this.CondidatProvider.getListCondidat().then((condidats: any) => {
        this.condidats = condidats;
        console.log(this.condidats);

        let index = this.condidats.findIndex(
          item => item.cin == this.object.item.cin
        );

        this.condidats[index].phone = this.phone;
        this.condidats[index].photo = this.photo;
        this.condidats[index].nom = this.nom;
        this.condidats[index].prenom = this.prenom;
        this.condidats[index].password = this.password;
        firebase
          .database()
          .ref("/condidats")
          .set(this.condidats);

        console.log("moniteur");
        this.CondidatProvider.setCondidatCourant(index);
        this.navCtrl.push(TabsPage);
      });
    } else {
      this.MoniteurProvider.getListMoniteur().then((moniteurs: any) => {
        this.moniteurs = moniteurs;
        console.log(this.moniteurs);

        let index = this.moniteurs.findIndex(
          item => item.cin == this.object.item.cin
        );
        if (index != -1) {
          this.moniteurs[index].phone = this.phone;
          this.moniteurs[index].photo = this.photo;
          this.moniteurs[index].nom = this.nom;
          this.moniteurs[index].prenom = this.prenom;
          this.moniteurs[index].password = this.password;
          firebase
            .database()
            .ref("/moniteurs")
            .set(this.moniteurs);

          console.log("condidat");
          this.MoniteurProvider.setMoniteurCourant(index);

          this.navCtrl.push(TabsPage);

          //console.log( this.moniteurs[index]);
        }
      });
    }
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.uploadFile(file).then((url: string) => {
      console.log(url);

      this.photo = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("images/" + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Chargement…");
        },
        error => {
          console.log("Erreur de chargement ! : " + error);
          reject();
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  detectFiles(event) {
    console.log(event.target.files[0]);

    this.onUploadFile(event.target.files[0]);
  }
}
