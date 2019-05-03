import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import * as firebase from "firebase";
import { WelcomePage } from "../pages/welcome/welcome";
import { PayementPage } from "../pages/payement/payement";
import { LoginPage } from "../pages/login/login";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = WelcomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      var config = {
        apiKey: "AIzaSyCTNHT7OBbPkGHfk5UF0J13cjPsoC-3ZVY",
        authDomain: "auto-ecole-632d4.firebaseapp.com",
        databaseURL: "https://auto-ecole-632d4.firebaseio.com",
        projectId: "auto-ecole-632d4",
        storageBucket: "auto-ecole-632d4.appspot.com",
        messagingSenderId: "1033708489207"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
