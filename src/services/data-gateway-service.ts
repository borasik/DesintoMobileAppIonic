import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Configuration } from "../configurations";
import { NavController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';


@Injectable()
export class DataServiceGateway {
  loginPage = LoginPage;

  constructor(private _http: Http, private _configuration: Configuration, public navCtrl: NavController) {
  }

  createAuthorizationHeader(headers: Headers, token: string) {
    headers.append('authentication', btoa(token));
  }

  public post = (url, body, options): Observable<any> => {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null) {
      this.navCtrl.push(this.loginPage);
    }

    var token = currentUser.token;

    let headers = new Headers();
    this.createAuthorizationHeader(headers, token);

    return this._http.post(url, body, options)
      .map(data => data.json());
  };
}