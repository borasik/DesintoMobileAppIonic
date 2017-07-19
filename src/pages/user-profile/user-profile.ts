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
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})

export class UserProfilePage implements OnInit {
  genders = [{ value: 'Male', code: '1' }, { value: 'Female', code: '2' }];
  yearsofbirth: number [] = [];
  countries: any [] = [{value: 'Canada', code: '1'}];
  userModel: any = {               name: 'Alex',                                    
                                    gender: { code: '2' },
                                    email: 'alex.borsuk@dh.com',
                                    yearofbirth: '1978',
                                    postalCode: 'L6H0C2',
                                    country: '1'
                                    };

  constructor() {

  }

  ngOnInit() {
    this.initYearOfBirthList();
  }

  private initYearOfBirthList(){
    for(let i = new Date().getFullYear(); i > new Date().getFullYear() - 100; i--)
      {
        this.yearsofbirth.push(i);
      }
  }

}
