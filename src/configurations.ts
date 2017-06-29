import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public ApiAuthServer: string = "https://sandbox.desinto.com/";

    public ApiServer: string = "https://sandbox.desinto.com/";

    // public ApiAuthServer: string = "http://localhost:51840/";
    //public ApiServer: string = "http://localhost:51840/";

    // public ApiAuthServer: string = "http://www.desinto.com/";

    //public ApiServer: string = "http://www.desinto.com/";
    public ApiAuthUrl: string = "customerregistrationapi/login";
    public ApiAuthLogoutUrl: string = "customerregistrationapi/logout";
    public ApiCampaignsUrl: string = "customercampaignsapi/getcampaigns";
    public ServerWithApiUrl: string = this.ApiAuthServer + this.ApiAuthUrl;
    public LoginPageLogo = "assets/images/logo.png";
} 