import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  packageName='';
  constructor(public navCtrl: NavController, private appAvailability: AppAvailability, private platform: Platform) {

  }


  onCheck() {
    this.appAvailability.check(this.packageName).then(
      (yes: Boolean) => alert(this.packageName + ' is available'),
      (no: Boolean) => alert(this.packageName + ' is NOT available'));
  }
}
