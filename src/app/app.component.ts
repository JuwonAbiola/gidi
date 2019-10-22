import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from "@ionic-native/fcm/ngx";
import { error } from "@angular/compiler/src/util";
import { Router, NavigationExtras } from "@angular/router";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  userName: string;

  // public appPages = [
  //   {
  //     title: 'Home',
  //     url: '/home',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Simple Map',
  //     url: '/simple',
  //     icon: 'list'
  //   },
  //   {
  //     title: 'Geo Location',
  //     url: '/geolocation',
  //     icon: 'list'
  //   },
  //   {
  //     title: 'Custom Marker',
  //     url: '/marker',
  //     icon: 'list'
  //   }, {
  //     title: 'Direction',
  //     url: '/direction',
  //     icon: 'list'
  //   }, {
  //     title: 'Direction with GeoLocation',
  //     url: '/direction-geo',
  //     icon: 'list'
  //   }, {
  //     title: 'Autocomplete',
  //     url: '/autocomplete',
  //     icon: 'list'
  //   }
  // ];
  public appPages = [
    { title: "Home", url: "/home", img: "assets/imgs/home1.svg" },
    { title: "Settings", url: "/signup", img: "assets/imgs/set1.svg" },
    { title: "Sign Out", url: "/login", img: "assets/imgs/out1.svg" }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    public nav: Router,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userName = localStorage.getItem("userName");
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("refffffooooopppp", token);
      });
      this.fcm.getToken().then(token => {
        console.log("ppppppp", token);
      });
      this.fcm.onTokenRefresh().subscribe(
        (token: any) => {
          console.log(`Got a new token ${token}`);
        },
        error => {
          console.log("onTokenRefresh", error);
        }
      );
      this.fcm.getToken().then(token => {
        console.log("ppppppp", token);
      });
      this.fcm.onNotification().subscribe(data => {
        console.log("onNotificationon Notification", data);
        if (data.wasTapped) {
          console.log("Received in background", data);
          if (data.paymentMode === "card" && data.type === "delivered") {
            const navigationExtras: NavigationExtras = {
              state: {
                data: data
              }
            };
            this.nav.navigate(["card"], navigationExtras);
          }
        } else {
          console.log("Received in foreground", data);
          this.localNotifications.schedule({
            id: Number(data.id),
            text: data.body,
            title: data.title
          });

          if (data.paymentMode === "card" && data.type === "delivered") {
            const navigationExtras: NavigationExtras = {
              state: {
                data: data
              }
            };
            this.nav.navigate(["card"], navigationExtras);
          }
        }
      });
    });
  }
}
