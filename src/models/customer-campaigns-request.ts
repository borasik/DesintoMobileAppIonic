
export class CustomerCampaignsRequest {
    Token: string
    DownloadRewards: boolean
    constructor(public token: string) {
        this.Token = token;
        this.DownloadRewards = true;
    }
}