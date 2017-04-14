import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CampaignsService } from '../../providers/campaigns-service';
import { CampaignPage } from '../campaign/campaign';

@Component({
  selector: 'page-campaigns',
  templateUrl: 'campaigns.html'
})
export class CampaignsPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _campaignsService: CampaignsService) {
 
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(CampaignPage, {
      campaign: item
    });
  }
}
