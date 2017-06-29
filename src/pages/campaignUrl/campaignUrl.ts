import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { BrowserModule } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { MarkCampaingAsVisitedRequest } from '../../models/mark-campaing-as-visited-request';
import { DataServiceGateway } from '../../services/data-gateway-service';
import { LoginPage } from '../login/login';
import { Configuration } from "../../configurations";

@Component({
  selector: 'page-campaign-url',
  templateUrl: 'campaignUrl.html'
})
export class CampaignUrlPage implements OnInit {
  campaign: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  thumpUrlPrefix: any;
  campaignViewed: Boolean;
  private loginPage = LoginPage;
  private campaignIsExpired = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appAvailability: AppAvailability,
    private dataServiceGateway: DataServiceGateway,
    private configurations: Configuration,
    private platform: Platform
  ) {
    this.thumpUrlPrefix = configurations.ApiServer;
    // If we navigated to this page, we will have an item available as a nav param
    this.campaign = navParams.get('campaign');

    this.campaignViewed = false;
  }

  openUrlCampaignPageToView(event, campaign) {
    window.open(campaign.Content,'_blank');
    this.markCampaignAsVisited(campaign);
    this.campaignViewed = true;
  }

  markCampaignAsVisited(campaign): void {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token;

    var markCampaingAsVisitedRequestModel = new MarkCampaingAsVisitedRequest(token, this.campaign.Id);
    this.dataServiceGateway.post("customercampaignsapi/markcustomercampaignvisited", markCampaingAsVisitedRequestModel).subscribe(
      (response) => {
        this.campaignViewed = true;
        campaign.IsViewed = true;
      },
      (err) => {

      },
      () => {

      });
  }

  ngOnInit() {
    let token: string;
    try {
      token = (JSON.parse(localStorage.getItem('currentUser'))).token;
    }
    catch (exception) {
      this.navCtrl.setRoot(this.loginPage);
    }
  }

  ionViewWillEnter() {
    if(this.campaign.ExperationDate != null){
      if(new Date(this.campaign.ExperationDate) < new Date())
      {
        this.campaignIsExpired = true;
      }
    }
    if (this.campaign.IsViewed) {
      this.campaignViewed = true;
    } else {
      this.campaignViewed = false;
    }
  }
}
