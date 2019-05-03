import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { PayementPage } from "../payement/payement";
import { RemarquePage } from "../remarque/remarque";
import { CommSuiviPage } from "../../pages/comm-suivi/comm-suivi";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = "HomePage";
  tab2Root = CommSuiviPage;
  tab3Root = PayementPage;

  constructor() {}
}
