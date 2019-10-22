import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  // @ViewChild("slides") slides: IonSlides;
  //
  fname: string = "";
  sname: string = "";
  phone: number;
  email: string = "";
  pword: string = "";
  cpword: string = "";
  constructor(public nav: Router, public api: ApiService) {}

  ngOnInit() {}
  // next() {
  //   this.slides.slideNext();
  // }

  // prev() {
  //   this.slides.slidePrev();
  // }
  login() {
    this.nav.navigate(["login"]);
  }
  signup = async () => {
    const data = {
      fname: this.fname,
      sname: this.sname,
      phone: this.phone.toString(),
      email: this.email.toLowerCase(),
      pword: this.pword,
      cpword: this.cpword
    };
    await this.api.signUp(data);
  };
}
