import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { LoadingController, ToastController } from "@ionic/angular";

import { ApiService } from "../api/api.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"]
})
export class CartPage implements OnInit {
  cylinder_size: string = "";
  location: string = "";
  cylinder_quantity: string = "";
  vendor: string;
  films: any;
  dfee: any;
  order: any;
  constructor(
    public nav: Router,
    public api: ApiService,
    private http: HttpClient,
    public loadingCtrl: LoadingController
  ) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.data = this.router.getCurrentNavigation().extras.state.user;
    //   }
    // });
    this.order = this.nav.getCurrentNavigation().extras.state.data;

    console.log("ordereeee", this.order);
  }

  ngOnInit() {
    console.log("ionViewDidLoad CartPage");

    const data = {
      vendor_id: "8",
      cylinder_size: this.order.currentNumber
    };
    const Header = {
      headers: new HttpHeaders().set(
        "x-access-token",
        localStorage.getItem("userToken")
      )
    };
    // this.api.presentLoading("Please wait");
    this.films = this.http.post(
      `${this.api.baseUrl}fee/checkout?`,
      data,
      Header
    );
    this.films.subscribe(
      (res: any) => {
        console.log(res);
        // this.loadingCtrl.dismiss();
        this.dfee = res.data;
      },
      error => {
        // this.api.disMissLoader();

        console.log(error);
      }
    );
  }
  checkout() {
    this.api.presentLoading("Creating Order");
    const header = {
      headers: new HttpHeaders().set(
        "x-access-token",
        localStorage.getItem("userToken")
      )
    };
    const cartData = {
      cylinder_quantity: "1",
      cylinder_size: this.order.currentNumber,
      address: "Yaba",
      location: this.order.location,
      notes: "Gidi Gas is the best",
      payment_mode: "card",
      vendor_id: "8",
      recipient_name: localStorage.getItem("userName"),
      recipient_phone: localStorage.getItem("userPhone"),
      amount: this.dfee.total.toString()
    };
    console.log("pppppp", cartData);
    this.http
      .post("https://gidigas.herokuapp.com/api/v1/order", cartData, header)
      .subscribe(
        (res: any) => {
          console.log("===>", res);
          this.api.disMissLoader();
          this.api.presentToast("Order created Successfully", 5000, "top");
          this.nav.navigate(["home"]);
        },
        error => {
          console.log(error);
          this.api.disMissLoader();
          alert(error.error.responseMessage);
        }
      );
  }
}
