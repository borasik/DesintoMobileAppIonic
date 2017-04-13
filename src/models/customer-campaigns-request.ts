
export class CustomerCampaignsRequest {
    Token: string
    constructor(public token: string) {
        this.Token = token;
    }
}