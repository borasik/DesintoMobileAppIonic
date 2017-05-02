import { Component, OnInit, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CampaignPage } from '../campaign/campaign';
import { DataServiceGateway } from '../../services/data-gateway-service';
import { CustomerCampaignsRequest } from '../../models/customer-campaigns-request';
import { LoginPage } from '../login/login';
import { Configuration } from "../../configurations";

@Component({
  selector: 'page-campaigns', 
  templateUrl: 'campaigns.html'
})
export class CampaignsPage {
  icons: string[];
  campaigns: object[];
  thumpUrlPrefix : any;
  private loginPage = LoginPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private dataServiceGateway: DataServiceGateway,
    private configurations: Configuration
    ) {
    this.campaigns = [];
    this.thumpUrlPrefix = configurations.ApiServer;    
   
    let token: string;
    try {
      token = (JSON.parse(localStorage.getItem('currentUser'))).token;      
    }
    catch (exception) {
      this.navCtrl.setRoot(this.loginPage);
    }

    var customerCampaignModel = new CustomerCampaignsRequest(token);
    this.dataServiceGateway.post("customercampaignsapi/getcampaigns", customerCampaignModel).subscribe(
      (response) => {
        /* this function is executed every time there's a new output */
        console.log("VALUE RECEIVED: " + response);
        this.campaigns = response.campaigns;
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

  itemTapped(event, campaign) {
    this.navCtrl.push(CampaignPage, {
      campaign: campaign
    });
  }

  contentType(campaign){
    switch(campaign.ContentType){
      case 0:
        return "URL";
      case 1:
        return "Flyer";
      case 2:
        return "Downloads Rewards";
      default:
        return "N/A";
    } 
  }
}
