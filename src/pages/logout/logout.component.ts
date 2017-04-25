import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.component.html'
})
export class LogoutPage implements OnInit {

    private loading: Loading;
    private loginPage = LoginPage;

    constructor(private authService: AuthService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController
    ) {

    }

    ngOnInit() {
        this.showLoading()
        this.authService.logout().subscribe(loggedout => {
      if (loggedout) {
        setTimeout(() => {
           this.loading.dismiss();
           this.navCtrl.setRoot(this.loginPage)
        });
      } else {
        this.showError("Logging Out Failed, Please Try Again Later");
      }
    },
      error => {
        this.showError("Logging Out Failed, Please Try Again Later");
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
