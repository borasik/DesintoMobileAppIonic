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
  selector: 'page-campaign',
  templateUrl: 'campaign.html'
})
export class CampaignPage implements OnInit {
  campaign: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  thumpUrlPrefix : any;
  campaignViewed : Boolean;
  private loginPage = LoginPage;


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

  public getApplicationId(campaign) : string {
    if (this.platform.is('ios')) {
      var pattern = /https:\/\/itunes.apple.com\/[^\/]+\/app\/([^\/]+)\/.*/g;
      var match = pattern.exec(campaign.ApplicationName);
      return match[1] + "://";
    }
    else if (this.platform.is('android')) {
      return campaign.ApplicationName;
    }
    return campaign.ApplicationName;
  }

  checkIfApplicationInstalled(campaign) : void{
    this.appAvailability.check(this.getApplicationId(this.campaign)).then(
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

  public validateInstallation() : void {
    this.checkIfApplicationInstalled(this.campaign);
    //this.markApplicationInstalled(this.campaign);
  }

  public getOSType() :string {
    if (this.platform.is('ios')) {
      return "IOS";
    }
    else if (this.platform.is('android')) {
      return "Android";
    }
    return "Unknown";
  }

  public getPlaystoreUrl(campaign){
    if (this.platform.is('ios')) {
      return campaign.ApplicationName;
    }
    else if (this.platform.is('android')) {
      return "http://play.google.com/store/apps/details?id="+campaign.ApplicationName;
    }
    return campaign.ApplicationName;
  }

  ngOnInit(){
     let token: string;
    try {
      token = (JSON.parse(localStorage.getItem('currentUser'))).token;      
    }
    catch (exception) {
      this.navCtrl.setRoot(this.loginPage);
    }
  }

  ionViewWillEnter() { 
    if(this.campaign.IsViewed){
      this.campaignViewed = true;
    } else {
      this.checkIfApplicationInstalled(this.campaign);
    }
  }
}
