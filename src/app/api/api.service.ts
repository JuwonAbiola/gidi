// api.service.ts
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { LoadingController, ToastController } from "@ionic/angular";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FCM } from "@ionic-native/fcm/ngx";

// import { Observable, throwError } from "rxjs";
// import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public nav: Router,
    public toastController: ToastController,
    private fcm: FCM
  ) {}

  // Base Url
  baseUrl = "https://gidigas.herokuapp.com/api/v1/";

  // Http Header
  Header = {
    headers: new HttpHeaders().set(
      "x-access-token",
      localStorage.getItem("userToken")
    )
  };

  // Token generator
  genToken = async () => await this.fcm.getToken();

  // refresh token gen

  refToken = async () => await this.fcm.onTokenRefresh();

  // Toast
  async presentToast(str, time, place) {
    const toast = await this.toastController.create({
      message: str,
      duration: time,
      position: place
    });
    toast.present();
  }

  // Loader
  async presentLoading(str) {
    const loading = await this.loadingCtrl.create({
      message: str
    });
    await loading.present();
  }

  // Dismiss Loader
  disMissLoader = () => {
    this.loadingCtrl.dismiss();
  };

  // Login function
  Login = async data => {
    if (data.email === "" || data.password === "") {
      this.presentToast("Please Fill all fields", 3000, "top");
      return;
    }
    await this.presentLoading("Please Wait");
    console.log("ioi", data);
    await this.http.post(`${this.baseUrl}auth/login`, data).subscribe(
      (res: any) => {
        localStorage.setItem("userToken", res.token);
        localStorage.setItem("userName", res.data.surname);
        localStorage.setItem("userPhone", res.data.phone);
        localStorage.setItem("userEmail", data.email);

        console.log(res);
        this.refTokenSender();
        this.disMissLoader();
        this.nav.navigate(["home"]);
      },
      error => {
        console.log(error);
        this.disMissLoader();
        alert(error.error.responseMessage);
      }
    );
  };

  // Send refresh token
  refTokenSender = async () => {
    const data = {
      fcmToken: await this.genToken()
    };
    this.http
      .post(`${this.baseUrl}auth/user/token`, data, this.Header)
      .subscribe(
        (res: any) => {
          console.log("refffff", res);
        },
        error => {
          console.log(error);
        }
      );
  };

  // Sign Up function
  signUp = async data => {
    if (
      data.email === "" ||
      data.pword === "" ||
      data.fname === "" ||
      data.sname === "" ||
      !data.phone ||
      data.cpword === ""
    ) {
      this.presentToast("Please Fill all fields", 3000, "top");
      return;
    }
    if (data.cpword != data.pword) {
      this.presentToast("Passwords dont match", 3000, "top");
      return;
    }
    let idata = {
      email: data.email,
      password: data.pword,
      firstname: data.fname,
      surname: data.sname,
      phone: data.phone,
      fcmToken: await this.genToken()
    };
    console.log("pop", idata);

    await this.presentLoading("Please Wait");
    this.http.post(`${this.baseUrl}auth/signup`, idata).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem("userToken", res.token);
        // localStorage.setItem("userName", res.data.surname);
        // localStorage.setItem("userPhone", res.data.phone);
        console.log(res);
        this.disMissLoader();
        this.nav.navigate(["home"]);
      },
      error => {
        console.log(error);
        this.disMissLoader();
        alert(error.error.responseMessage);
      }
    );
  };

  // Get Orders
  getOrders = async () => {
    this.http.get(`${this.baseUrl}order`, this.Header).subscribe(
      (res: any) => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  };
}
