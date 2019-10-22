import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(public api: ApiService, public nav: Router) {}
  ngOnInit() {}

  ionViewDidEnter() {
    localStorage.clear();
  }
  async login() {
    const data = {
      email: this.email.toLowerCase(),
      password: this.password
    };
    await this.api.Login(data);
  }

  signup() {
    this.nav.navigate(["signup"]);
  }
}
