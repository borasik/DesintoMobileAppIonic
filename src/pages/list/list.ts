import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceGateway } from '../../services/data-gateway-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage implements OnInit {

  constructor(private dataServiceGateway: DataServiceGateway, public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit() {
    this.dataServiceGateway.post("", "", "").subscribe(
      data => {
        var res = data;

      },
      err => {
        console.log("Oops!");
      });
  }
}
