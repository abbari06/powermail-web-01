export interface updateLabelModal{
    userId:number;
    userAccountId:number;
    campaign:{
        id:number;
        title:string;
        status:string;
        description:string;
        mailAccountId:string;
        type:string;
        settings:[]
        schedule:{
            
        };
        labels:[
            
        ];
        steps:[]
    }
}