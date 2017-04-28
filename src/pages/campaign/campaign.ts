import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavController, NavParams } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { BrowserModule } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private appAvailability: AppAvailability) {
    this.thumpUrlPrefix = "http://www.desinto.com";
    // If we navigated to this page, we will have an item available as a nav param
    this.campaign = navParams.get('campaign');

    this.campaignViewed = false;
    this.appAvailability.check(this.campaign.ApplicationName).then(
      (yes: Boolean) => this.campaignViewed = true,
      (no: Boolean) => this.campaignViewed = false);
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
}
