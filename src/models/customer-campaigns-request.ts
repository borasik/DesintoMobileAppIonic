
export class CustomerCampaignsRequest {
    public Token: string
    constructor(public token: string) {
        this.Token = token;
    }
}