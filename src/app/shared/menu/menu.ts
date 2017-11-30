import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.html'
})
export class AppMenu {

  constructor(public viewCtrl: ViewController) {

  }

  openProfilePage() {
    this.viewCtrl.dismiss('openProfile');
  }
}
