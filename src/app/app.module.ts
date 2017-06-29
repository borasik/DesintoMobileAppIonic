import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { AuthService } from '../providers/auth-service';
import { CampaignsService } from '../providers/campaigns-service';
import { AuthServiceGateway } from '../services/auth-service-gateway';
import { DataServiceGateway } from '../services/data-gateway-service';
import { Configuration } from '../configurations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CampaignPage } from '../pages/campaign/campaign';
import { CampaignUrlPage } from '../pages/campaignUrl/campaignUrl';
import { CampaignsPage } from '../pages/campaigns/campaigns';
import { LoginPage } from '../pages/login/login';
import { TestPage } from '../pages/appavailabilitytest/test';
import { LandingPage } from '../pages/landing/landing';
import { LogoutPage } from '../pages/logout/logout.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';

import { TruncatePipe } from '../pipes/truncate-pipe';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b3a1adfd'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CampaignsPage,
    CampaignPage,
    CampaignUrlPage,
    LoginPage,
    TestPage,
    LandingPage,
    LogoutPage,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CampaignsPage,
    CampaignPage,    
    CampaignUrlPage,
    LoginPage,
    TestPage,
    LandingPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    AppAvailability,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    CampaignsService,
    Configuration,
    AuthServiceGateway,
    DataServiceGateway
  ]
})
export class AppModule { }
