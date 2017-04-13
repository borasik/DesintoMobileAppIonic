import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceGateway } from '../../services/data-gateway-service';
import { CustomerCampaignsRequest } from '../../models/customer-campaigns-request';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage{
//export class ListPage implements OnInit {
  loginPage = LoginPage;

  constructor(public dataServiceGateway: DataServiceGateway, public navCtrl: NavController, public navParams: NavParams) {

  }

  // ngOnInit() {
  //   var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser === null) {
  //     this.navCtrl.push(this.loginPage);
  //   }

  //   var token = currentUser.token;

  //   var customerCampaignModel = new CustomerCampaignsRequest(token);
  //   this.dataServiceGateway.post("customercampaignsapi/getcampaigns", customerCampaignModel, null).subscribe(
  //     data => {
  //       var res = data;

  //     },
  //     err => {
  //       console.log("Oops!");
  //     });
  // }
}
