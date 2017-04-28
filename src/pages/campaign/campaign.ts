import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavController, NavParams } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { BrowserModule } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { MarkCampaingAsVisitedRequest } from '../../models/mark-campaing-as-visited-request';
import { DataServiceGateway } from '../../services/data-gateway-service';

@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html'
})
export class CampaignPage {
  campaign: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  thumpUrlPrefix : any;
  campaignViewed : Boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, private appAvailability: AppAvailability, private dataServiceGateway: DataServiceGateway) {
    this.thumpUrlPrefix = "http://www.desinto.com";
    // If we navigated to this page, we will have an item available as a nav param
    this.campaign = navParams.get('campaign');

    this.campaignViewed = false;

    if(this.campaign.IsViewed){
      this.campaignViewed = true;
    } else {
      this.checkIfApplicationInstalled(this.campaign);
    }
  }

  checkIfApplicationInstalled(campaign) : void{
    this.appAvailability.check(this.campaign.ApplicationName).then(
        (yes: Boolean) => {
          if(!this.campaign.IsViewed){
              this.markApplicationInstalled(campaign)
          }
        },
        (no: Boolean) => this.campaignViewed = false);
  }

  markApplicationInstalled(campaign) : void {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token;

    var markCampaingAsVisitedRequestModel = new MarkCampaingAsVisitedRequest(token, this.campaign.SystemCampaignId);
    this.dataServiceGateway.post("customercampaignsapi/markcustomercampaignvisited", markCampaingAsVisitedRequestModel).subscribe(
      (response) => {
        /* this function is executed every time there's a new output */
        console.log("VALUE RECEIVED: " + response);
        this.campaignViewed = true;
        // TODO: Here we should reload campaign and update view
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
