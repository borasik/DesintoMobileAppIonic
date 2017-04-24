import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Configuration } from "../configurations";

//import { LoginPage } from '../pages/login/login';



@Injectable()
export class DataServiceGateway {
  //loginPage = LoginPage;

  constructor(private _http: Http, public _configuration: Configuration) {
  }
  

  createAuthorizationHeader(headers: Headers, token: string) {
    headers.append('authentication', btoa(token));
  }

  public post = (url, body): Observable<any> => {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null) {
      //this.navCtrl.push(this.loginPage);
      return Observable.throw("Please Login");
    }

    var token = currentUser.token;
    let headers = new Headers();
    this.createAuthorizationHeader(headers, token);
    let options = new RequestOptions({headers: headers});

    return this._http.post(this._configuration.ApiServer + url, body, options)
      .map(data => data.json());
  };
}