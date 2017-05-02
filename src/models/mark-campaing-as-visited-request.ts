
export class MarkCampaingAsVisitedRequest {
    Token: string
    CustomerCampaingId: number
    constructor(public token: string, public customerCampaignId: number) {
        this.Token = token;
        this.CustomerCampaingId = customerCampaignId;
    }
}