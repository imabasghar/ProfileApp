import { ViewController } from 'ionic-angular';
import { Component, ViewChild, ElementRef, NgZone } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";

declare var google;

@Component({
  selector: "page-location-picker",
  templateUrl: "location-picker.html"
})
export class LocationPickerPage {
  lat: number = 51.678418;
  lng: number = 7.809007;
  public searchControl: FormControl;
  public zoom: number;
  private geocoder;

  public infoWindowLabel: string;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public viewCtrl: ViewController
  ) {}
  ionViewDidLoad() {
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.setCurrentPosition();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.setMarkerPosition(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setMarkerPosition(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }

  private setMarkerPosition(latitude, longitude, zoom = 15) {
    this.lat = latitude;
    this.lng = longitude;
    this.zoom = zoom;

    this.setLabelForMarker(latitude, longitude);
  }

  setLabelForMarker(latitude, longitude) {
    this.geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.infoWindowLabel = results[0].formatted_address;
          } else {
            this.infoWindowLabel = "No Location Found";
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  onMapClick(position) {
    this.setMarkerPosition(position.coords.lat, position.coords.lng);
  }

  selectLocation() {
    this.viewCtrl.dismiss(this.infoWindowLabel);
  }
}
