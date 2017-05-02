import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public ApiAuthServer: string = "https://sandbox.desinto.com/";
    public ApiServer: string = "https://sandbox.desinto.com/";
    //public ApiAuthServer: string = "http://localhost:51840/";
    //public ApiServer: string = "http://localhost:51840/";
    public ApiAuthUrl: string = "customerregistrationapi/login";
    public ApiAuthLogoutUrl: string = "customerregistrationapi/logout";
    public ApiCampaignsUrl: string = "customercampaignsapi/getcampaigns";
    public ServerWithApiUrl: string = this.ApiAuthServer + this.ApiAuthUrl;
    public LoginPageLogo = "http://localhost:8100/assets/images/logo.png";
} 