
export class CustomerCampaignsRequest {
    public DownloadRewards: boolean
    public Token: string
    constructor(public token: string) {
        this.Token = token;
        this.DownloadRewards = true;
    }
}