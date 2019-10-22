import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule"
  },
  {
    path: "list",
    loadChildren: "./list/list.module#ListPageModule"
  },
  { path: "simple", loadChildren: "./simple/simple.module#SimplePageModule" },
  {
    path: "geolocation",
    loadChildren: "./geolocation/geolocation.module#GeolocationPageModule"
  },
  { path: "marker", loadChildren: "./marker/marker.module#MarkerPageModule" },
  {
    path: "direction",
    loadChildren: "./direction/direction.module#DirectionPageModule"
  },
  {
    path: "direction-geo",
    loadChildren: "./direction-geo/direction-geo.module#DirectionGeoPageModule"
  },
  {
    path: "autocomplete",
    loadChildren: "./autocomplete/autocomplete.module#AutocompletePageModule"
  },
  {
    path: "gactive",
    loadChildren: "./gactive/gactive.module#GactivePageModule"
  },
  {
    path: "ghistory",
    loadChildren: "./ghistory/ghistory.module#GhistoryPageModule"
  },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  { path: "order", loadChildren: "./order/order.module#OrderPageModule" },
  { path: "signup", loadChildren: "./signup/signup.module#SignupPageModule" },
  { path: "cart", loadChildren: "./cart/cart.module#CartPageModule" },
  { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule' },
  { path: 'card', loadChildren: './card/card.module#CardPageModule' },
  { path: 'success', loadChildren: './success/success.module#SuccessPageModule' },
  { path: 'failed', loadChildren: './failed/failed.module#FailedPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
