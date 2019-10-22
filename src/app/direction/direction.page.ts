import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Router } from "@angular/router";

declare var google;
@Component({
  selector: "app-direction",
  templateUrl: "./direction.page.html",
  styleUrls: ["./direction.page.scss"]
})
export class DirectionPage implements OnInit, AfterViewInit {
  @ViewChild("mapElement") mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  constructor(
    private fb: FormBuilder,
    private geolocation: Geolocation,
    public nav: Router
  ) {
    this.createDirectionForm();
  }

  ngOnInit() {}

  createDirectionForm() {
    this.directionForm = this.fb.group({
      source: ["", Validators.required],
      destination: ["", Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.directionsDisplay.setMap(map);
  }

  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route(
      {
        origin: formValues.source,
        destination: formValues.destination,
        travelMode: "DRIVING"
      },
      (response, status) => {
        console.log("rers", response);
        console.log("status", status);
        if (status === "OK") {
          localStorage.setItem("location", formValues.destination);

          that.directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  order() {
    this.nav.navigate(["order"]);
  }
}
