import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api/api.service";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

@Component({
  selector: "app-gactive",
  templateUrl: "./gactive.page.html",
  styleUrls: ["./gactive.page.scss"]
})
export class GactivePage implements OnInit {
  films: any;
  loader: any;
  empty: any;

  constructor(
    public nav: Router,
    public api: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Http Header
    const Header = {
      headers: new HttpHeaders().set(
        "x-access-token",
        localStorage.getItem("userToken")
      )
    };
    this.loader = "loading";
    this.films = this.http.get(`${this.api.baseUrl}order/ongoing`, Header);
    this.films.subscribe(
      (res: any) => {
        console.log(res);
        this.loader = undefined;
      },
      error => {
        console.log(error);
        if (error.error.responseMessage === "You have no order completed yet") {
          this.loader = undefined;
          this.empty = "empty";
        }
      }
    );
  }
  async ohistory() {
    this.nav.navigate(["ghistory"]);
  }

  order() {
    this.nav.navigate(["order"]);
  }
}
