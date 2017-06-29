import { Component, OnInit, Pipe } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, Platform, AlertController} from 'ionic-angular';
import { CampaignPage } from '../campaign/campaign';
import { CampaignUrlPage } from '../campaignUrl/campaignUrl';
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
  loading: Loading;
  campaigns: object[];
  thumpUrlPrefix: any;
  private loginPage = LoginPage;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public navParams: NavParams, private dataServiceGateway: DataServiceGateway,
    private configurations: Configuration, private platform: Platform, private alertCtrl: AlertController) {
    this.campaigns = [];
    this.thumpUrlPrefix = configurations.ApiServer;
  }

  itemTapped(event, campaign) {
    if (campaign.ContentType === 2) {
      this.navCtrl.push(CampaignPage, {
        campaign: campaign
      });
    }
    else if (campaign.ContentType === 0) {
      this.navCtrl.push(CampaignUrlPage, {
        campaign: campaign
      });      
    }
    else{
        this.presentAlert();
      };
  }

  contentType(campaign) {
    switch (campaign.ContentType) {
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

  ionViewWillEnter() {
    this.showLoading();
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
        if (this.platform.is('ios')) {
          this.campaigns = response.campaigns.filter(x => x.ApplicationPlatform == 2);//IGOR Add URL and Flyer Campaigns
        }
        else if (this.platform.is('android')) {
          this.campaigns = response.campaigns.filter(x => x.ApplicationPlatform == 1);//IGOR Add URL and Flyer Campaigns
        }
        else {
          this.campaigns = response.campaigns;
        }

      },
      (err) => {
        this.loading.dismiss();
        console.log("ERROR: " + err);
      },
      () => {
        this.loading.dismiss();
        console.log("COMPLETED");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Campaign Type not Supported',
      subTitle: 'Sorry this campaign type not supported by mobile application. We are working on it. Please use Desinto Web Site to view this type of campaigns. Thank You!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
