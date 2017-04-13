import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DataServiceGateway } from '../../services/data-gateway-service';
import { CustomerCampaignsRequest } from '../../models/customer-campaigns-request';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  loginPage = LoginPage;

  constructor(private dataServiceGateway: DataServiceGateway, public navCtrl: NavController) {

  }

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null) {
      //this.navCtrl.push(this.loginPage);
    }

    var token = currentUser.token;

    var customerCampaignModel = new CustomerCampaignsRequest(token);
    this.dataServiceGateway.post("customercampaignsapi/getcampaigns", customerCampaignModel).subscribe(
      (response) => {
        /* this function is executed every time there's a new output */
        console.log("VALUE RECEIVED: " + response);
      },
      (err) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + err);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("COMPLETED");
      });
  }
}
