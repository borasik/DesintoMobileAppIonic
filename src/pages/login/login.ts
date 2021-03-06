import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { CampaignsPage } from '../campaigns/campaigns';
import { Configuration } from "../../configurations";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loading: Loading;
  homePage = CampaignsPage;
  registerCredentials = { email: '', password: '' };
  private LoginPageLogo: any;

  constructor(public navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private configurations: Configuration) {
    this.LoginPageLogo = this.configurations.LoginPageLogo;

  }

  ngOnInit() {
    let token: string;
    try {
      token = (JSON.parse(localStorage.getItem('currentUser'))).token;
      this.navCtrl.setRoot(this.homePage);
    }
    catch (exception) {

    }
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot(this.homePage)
        });
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError("Something went wrong. Please try again");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
