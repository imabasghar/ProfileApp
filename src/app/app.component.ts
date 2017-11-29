import { AppMenu } from './shared/menu/menu';
import { Component } from '@angular/core';
import { Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public popoverCtrl: PopoverController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onMoreButtonClick(myEvent) {
    let popover = this.popoverCtrl.create(AppMenu);
    popover.present({
      ev: myEvent
    });
  }
}

