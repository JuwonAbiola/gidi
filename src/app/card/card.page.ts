import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { LoadingController, ToastController } from "@ionic/angular";
import { ApiService } from "../api/api.service";
import { Router, NavigationExtras } from "@angular/router";
import { FailedPage } from "../failed/failed.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-card",
  templateUrl: "./card.page.html",
  styleUrls: ["./card.page.scss"]
})
export class CardPage implements OnInit {
  cvc: string;
  expY: string;
  expM: string;
  cardNum: string;
  cardName: string;
  order: any;

  constructor(
    public nav: Router,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public api: ApiService,
    public toastController: ToastController,
    public modalController: ModalController
  ) {
    // this.order = this.nav.getCurrentNavigation().extras.state.data;

    console.log("ordereeee", this.order);
  }

  ngOnInit() {}

  async onDeviceReady() {
    // Now safe to use device APIs
    (<any>window).window.PaystackPlugin.chargeCard(
      res => {
        // charge successful, grab transaction reference - do your thang!
        console.log("charge successful: ", res);
        this.refTokenSender(res.reference);
        this.nav.navigate(["success"]);
      },
      async error => {
        // Something went wrong, oops - perhaps an invalid card.
        console.log("charge failed: ", error);
        const modal = await this.modalController.create({
          component: FailedPage
        });
        return modal.present();
      },
      {
        cardNumber: this.cardNum,
        expiryMonth: this.expM,
        expiryYear: this.expY,
        cvc: this.cvc,
        email: localStorage.getItem("userEmail"),
        amountInKobo: 150000
      }
    );
  }

  // Send refresh token
  refTokenSender = async str => {
    const data = {
      reference: str,
      amount: this.order.amount,
      orderId: this.order.orderNumber
    };
    this.http
      .post(`${this.api.baseUrl}transaction`, data, this.api.Header)
      .subscribe(
        (res: any) => {
          console.log("refffff", res);
        },
        error => {
          console.log(error);
        }
      );
  };
}
