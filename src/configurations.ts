import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public ApiAuthServer: string = "https://desinto.com/";
    public ApiAuthUrl: string = "customerregistrationapi/login";
    public ApiCampaignsUrl: string = "customercampaignsapi/getcampaigns";
    public ServerWithApiUrl: string = this.ApiAuthServer + this.ApiAuthUrl;
} 