import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CampaignsService } from '../../providers/campaigns-service';

@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html'
})
export class CampaignPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _campaignsService: CampaignsService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('campaign');

    
  }
}
