export interface payloadStep3{
    userId:number,
    userAccountId:number,
      campaignStep:{
          id:number, //for first time, this field can be skipped, but for updates this value should be >0
          campaignId:number, //id of the campaign for which messages are being added
          type:string, //hardcoded value for EMAIL type
          stepNumber:number, //can be 2, 3, 4 etc depending on step number
          delayAsString:string,
          emails:[//At a Time more than one emails can be passed in the 
              {
                  id:number, //for first time, this field can be skipped, but for updates this value should be >0
                  campaignId:number,
                  subject:'',
                  body:'',
              }
            ]
      }
}