import { Injectable } from '@angular/core';
import * as firebase from 'firebase' ;
/*
  Generated class for the MoniteurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoniteurProvider {

  Moniteurs : Array<any> = []  ;
  moniteurC =null ;
  constructor() {
  }

  getListMoniteur() {
      return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/moniteurs').once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          } 
        );
      }
    );
  }

  setMoniteurCourant(c) {
    this.moniteurC=c;
  }
  getMoniteurCourant() {
    return this.moniteurC ;
  }

}
