import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Configuration } from "../configurations";
import { LogoutModel } from "../models/logout-model";

export class logInModel {
  password: string;
  email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}


@Injectable()
export class AuthServiceGateway {
  constructor(private _http: Http, private _configuration: Configuration) {
  }

  public authenticate = (password, email): Observable<any> => {
    return this._http.post(this._configuration.ServerWithApiUrl, new logInModel(password, email))
      .map(data => data.json());
  };

  public logout(token: string): Observable<any> {
    if(token == undefined || token.length == 0 || token == null){
      Observable.throw("Token can't be Empty");
    }

    return this._http.post(this._configuration.ApiAuthServer + this._configuration.ApiAuthLogoutUrl, new LogoutModel(token));
  }
}