import { TabsPage } from '../tabs/tabs';
import { Tabs1Page } from '../tabs1/tabs1';
import { Component } from '@angular/core';
import { NavController, NavParams, Item } from 'ionic-angular';
import { CondidatProvider } from '../../providers/condidat/condidat';
import { MoniteurProvider } from '../../providers/moniteur/moniteur';
import { AlertController } from "ionic-angular";

import { WelcomePage } from '../welcome/welcome';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  condidats :any  ;
  moniteurs :any  ;
  checkcin : any;
  cin : any ;
  password : any;

  constructor( private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public CondidatProvider : CondidatProvider , public MoniteurProvider:MoniteurProvider ) {

  }
check_pass():any {
  console.log(this.password);
  if(( this.password==undefined || this.password=="")||(this.cin==undefined||this.cin=="")) {
    let alert=this.alertCtrl.create({
      title: ' Missing infos!',
      buttons: [{
          text: 'OK',
          role: 'confirm' },
          
      ]
  });
  alert.present();
  }
  else
  { this.CondidatProvider.getListCondidat().then(
      (condidats: any) => {
        this.condidats=condidats ;
        let index = this.condidats.findIndex(item => item.cin ==this.cin) ;
        let index1 = this.condidats.findIndex(item => item.password ==this.password  );
    if((index1!=-1) &&(index!=-1)){
      let object = {
        genre : 'condidat' ,
        item : this.condidats[index1]
        
      }
      let object1 = {
        genre : 'condidat' ,
        item : this.condidats[index]
      }
        this.navCtrl.push(Tabs1Page);}
    else {
      this.MoniteurProvider.getListMoniteur().then(
        (moniteurs: any) => {
          this.moniteurs=moniteurs ;
          console.log(this.moniteurs);

          let index = this.moniteurs.findIndex(item => item.cin ==this.cin) ;
          let index1 = this.moniteurs.findIndex(item => item.password ==this.password  );
      if((index1!=-1) &&(index!=-1)){
        let object = {
          genre : 'moniteur' ,
          item : this.moniteurs[index1]
          
        }
        let object1 = {
          genre : 'moniteur' ,
          item : this.moniteurs[index]
        }
          this.navCtrl.push(TabsPage);
      }else {
     // alert(" check your infos ! ") ;
     let alert=this.alertCtrl.create({
      title: ' Check your infos!',
      buttons: [{
          text: 'OK',
          role: 'confirm' },
          
      ]
  });
  alert.present();
    
}}); }});}} 

 
     
}