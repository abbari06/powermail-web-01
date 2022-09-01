export interface settingspayload{
    userId:number,
	userAccountId:number,
    campaign:{
        id:number, //id of the campaign for which settings are being added
        settings:{
            maxEmailsPerDay:number,
            enableLinkClickTracking:boolean,
            enableOpenTracking:boolean,
            moveBouncesToDnmList:boolean,
            prospect_actions:[
                {

                    trigger:string,  //[OPENED-ANY,REPLIED-ANY,CLICKED-ANY]
                    action:string,     //[FINISHED,APPLYLABEL]
                    labels:[
                    ]
                },
                //  {
                //     trigger:string,  //[OPENED-ANY,REPLIED-ANY,CLICKED-ANY]
                //     action:string     //[FINISHED,APPLYLABEL]
                // }
                
            ] ,
            prospectCampaignFinishedAction: {
                action:string,     //[TOTALFINISHED,APPLYLABEL],incase of TotalFinished, labels field will not be passed
                labels:[
                      
                    ]
            }
        }
    }
}