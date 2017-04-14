import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public ApiAuthServer: string = "http://localhost:51840/";
    public ApiServer: string = "http://localhost:51840/";
    public ApiAuthUrl: string = "customerregistrationapi/login";
    public ApiCampaignsUrl: string = "customercampaignsapi/getcampaigns";
    public ServerWithApiUrl: string = this.ApiAuthServer + this.ApiAuthUrl;
} 