import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api/api.service";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"]
})
export class OrderPage implements OnInit {
  films: any;
  currentNumber = 0;
  ven: any;
  location: string;

  constructor(
    public nav: Router,
    public api: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const header = {
      headers: new HttpHeaders().set(
        "x-access-token",
        localStorage.getItem("userToken")
      )
    };
    this.films = this.http.get(`${this.api.baseUrl}vendor`, header);
    this.films.subscribe(
      (res: any) => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  increment() {
    this.currentNumber++;
    console.log("pol");
  }

  decrement() {
    this.currentNumber--;
  }

  cart() {
    const data = {
      currentNumber: this.currentNumber.toString(),
      vendor: this.ven,
      location: this.location
    };
    // localStorage.setItem("cylinder_size", this.currentNumber.toString());
    // localStorage.setItem("location", this.location);
    // localStorage.setItem("vendor", this.ven);
    // localStorage.setItem("cylinder_quantity", "1");
    const navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };
    this.nav.navigate(["cart"], navigationExtras);
  }
}
