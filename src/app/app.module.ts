import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { WelcomePage } from "../pages/welcome/welcome";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { CinCheckPage } from "../pages/cin-check/cin-check";
import { MyApp } from "./app.component";
import { TabsPage } from "../pages/tabs/tabs";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { PayementPage } from "../pages/payement/payement";
import { RemarquePage } from "../pages/remarque/remarque";
import { CommPage } from "../pages/comm/comm";
import { Tabs1Page } from "../pages/tabs1/tabs1";
import { AddPayementPage } from "../pages/add-payement/add-payement";
import { CondidatProvider } from "../providers/condidat/condidat";
import { MoniteurProvider } from "../providers/moniteur/moniteur";
import { AjouterHeurePage } from "../pages/ajouter-heure/ajouter-heure";
import { GeneralProvider } from "../providers/general/general";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
var config = {
  apiKey: "AIzaSyCTNHT7OBbPkGHfk5UF0J13cjPsoC-3ZVY",
  authDomain: "auto-ecole-632d4.firebaseapp.com",
  databaseURL: "https://auto-ecole-632d4.firebaseio.com",
  projectId: "auto-ecole-632d4",
  storageBucket: "auto-ecole-632d4.appspot.com",
  messagingSenderId: "1033708489207"
};
import { CommSuiviPage } from "../pages/comm-suivi/comm-suivi";

//import { Device } from "@ionic-native/device";
//import { LoginsPage } from "../pages/logins/logins";
import { Geolocation } from '@ionic-native/geolocation';
import { GeotrackPage } from "../pages/geotrack/geotrack";
//import { Device } from '@ionic-native/device';
//declare let Device:any;
@NgModule({
  declarations: [
    WelcomePage,
    LoginPage,
    AboutPage,
    TabsPage,
    ContactPage,
    RemarquePage,
    AjouterHeurePage,
    PayementPage,
    SignupPage,
    MyApp,
    CinCheckPage,
    Tabs1Page,
    AddPayementPage,
    CommPage,
    CommSuiviPage,
    GeotrackPage
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ContactPage,
    AboutPage,
    TabsPage,
    WelcomePage,
    RemarquePage,
    LoginPage,
    PayementPage,
    SignupPage,
    AjouterHeurePage,
    CinCheckPage,
    MyApp,
    AddPayementPage,
    Tabs1Page,
    CommPage,
    CommSuiviPage,
    GeotrackPage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    
    CondidatProvider,
    MoniteurProvider,
    GeneralProvider,
    
  ],
  
})
export class AppModule {}
