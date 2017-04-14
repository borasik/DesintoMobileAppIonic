import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TestPage } from '../appavailabilitytest/test';

@Component({
  selector: 'page-home',
  templateUrl: 'landing.html'
})
export class LandingPage {
  loginPage = LoginPage;
  testPage = TestPage;
  constructor(public navCtrl: NavController) {

  }

  onLogin() {
    this.navCtrl.push(this.loginPage);
  }

  checkAppAvailability(){
    this.navCtrl.push(this.testPage);
  }
}
