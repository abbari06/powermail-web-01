export interface payload{
    userId:number;
    userAccountId:number;
    campaign:{
        id:number;
        title:string;
        status:string;
        description:string;
        mailAccountId:string;
        type:string;
        schedule:{
            
        };
        labels:[
            
        ];
        steps:[]
    }
}