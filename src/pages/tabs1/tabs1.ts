import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";

@Component({
  selector: "page-tabs1",
  templateUrl: "tabs1.html"
})
export class Tabs1Page {
  tab1Root = "Home1Page";
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {}
}
