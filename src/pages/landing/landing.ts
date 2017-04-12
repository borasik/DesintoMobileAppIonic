import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'landing.html'
})
export class LandingPage {
  loginPage = LoginPage;
  constructor(public navCtrl: NavController) {

  }

  onLogin() {
    this.navCtrl.push(this.loginPage);
  }
}
