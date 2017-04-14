import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Configuration } from "../configurations";

import { AuthService } from '../providers/auth-service';


export class CampaignsRequestModel {
  mobile: boolean;
  token: string;
 
  constructor(token: string, mobile: boolean) {
    this.mobile = mobile;
    this.token = token;
  }
}

@Injectable()
export class CampaignsService {
    constructor(private _http: Http, private _configuration: Configuration, private _authService: AuthService) {
    }

    public getCampaigns = (): Observable<any> => {
        return this._http.post(
                this._configuration.ApiAuthServer + this._configuration.ApiCampaignsUrl, 
                new CampaignsRequestModel(this._authService.getUserInfo().Token, true)) 
            .map(data => data.json());
    };
}