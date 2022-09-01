export class user_model{
    firstname:string;
    lastname:string;
    accounttype:string;
    company:string
    createdAt:number;
    creationId: string;
    deletedFlag:boolean;
    email:string;
    emailverified:boolean;
    id:number
    modifiedAt:number;
    useraccounts: [];
    token:"";
    mailAccountconnected:boolean;
    prospectsAdded:boolean;
    prospectLabelAdded:boolean;
    campaignCreated:boolean;
    fb_token:string;
    trialPlan:boolean;
}