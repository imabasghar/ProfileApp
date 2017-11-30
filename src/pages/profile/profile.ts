import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { PROFILE_STORAGE_KEY } from "../../app/shared/constants";
import { Profile } from "../../app/shared/models/profile.model";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  currentProfile: Profile = new Profile();
  newProfile: Profile = new Profile();
  inEditMode = false;
  storage = window.localStorage;
  showErrorMessages = false;
  constructor(public navCtrl: NavController) {
    this.loadProfile();
  }

  loadProfile() {
    let val = this.storage.getItem(PROFILE_STORAGE_KEY);
    if (!val) {
      this.inEditMode = true;
      return;
    }

    this.currentProfile = JSON.parse(val);
    this.newProfile = JSON.parse(val);
  }

  saveProfile() {
    this.showErrorMessages = !this.isFormValid();
    if(this.showErrorMessages) {
      return;
    }
    this.currentProfile = JSON.parse(JSON.stringify(this.newProfile));
    this.storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(this.currentProfile));
    this.inEditMode = false;
  }

  isFormValid() {
    if(Object.keys(this.newProfile).length < 4)
      return false;
    for (var key in this.newProfile) {
      console.log('key', key);
      if (this.newProfile.hasOwnProperty(key) && !this.newProfile[key]) {
        return false;
      }
  }
    return true;
  }

  cancelEdit() {
    this.newProfile = JSON.parse(JSON.stringify(this.currentProfile));
    this.inEditMode = false;
    this.showErrorMessages = false;
  }

  onErrorMessageClick($event) {
    // On Click of error message, focuses the respective input box
    console.log($event);
  }
}
