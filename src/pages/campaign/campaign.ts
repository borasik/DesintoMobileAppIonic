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
    private configurations: Configuration) {
    this.thumpUrlPrefix = configurations.ApiServer;
    // If we navigated to this page, we will have an item available as a nav param
    this.campaign = navParams.get('campaign');

    this.campaignViewed = false;
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
