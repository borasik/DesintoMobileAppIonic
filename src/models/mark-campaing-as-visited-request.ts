
export class MarkCampaingAsVisitedRequest {
    Token: string
    CustomerCampaignId: number
    constructor(public token: string, public customerCampaignId: number) {
        this.Token = token;
        this.CustomerCampaignId = customerCampaignId;
    }
}