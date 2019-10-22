import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  userName: string;
  constructor(public nav: Router) {}
  ngOnInit() {
    this.userName = localStorage.getItem("userName");
  }
  orders() {
    this.nav.navigate(["gactive"]);
  }

  order() {
    this.nav.navigate(["order"]);
  }
  card() {
    this.nav.navigate(["card"]);
  }
}
