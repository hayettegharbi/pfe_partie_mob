import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { CondidatProvider } from "../condidat/condidat";
@Injectable()
export class GeneralProvider {
  genre: any;
  ListCondidat: Array<any> = [];
  ListCondidatPayemet: Array<any> = [];
  constructor(public condidat: CondidatProvider) {
    this.genre = "moniteur";
  }

  setgenre(genre: any) {
    this.genre = genre;
  }

  getListHours() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/heurs")
        .once("value")
        .then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getListPayement() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/payement")
        .once("value")
        .then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getListCommantaires() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/commentaires")
        .once("value")
        .then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getListRemarques() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/remarques")
        .once("value")
        .then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
