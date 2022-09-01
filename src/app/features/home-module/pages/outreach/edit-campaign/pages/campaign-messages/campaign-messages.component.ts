import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { day,hour,minute } from '../../../add-campaign-wizard/step-three/models/delay-string';
import { payloadStep3 } from '../../../payload-modals/step-3';
@Component({
  selector: 'app-campaign-messages',
  templateUrl: './campaign-messages.component.html',
  styleUrls: ['./campaign-messages.component.scss']
})
export class CampaignMessagesComponent implements OnInit {
  previousStepNumber:number;
  previousDayNumber:number;
  edit=false;
  payload:payloadStep3={
    userId:0,
    userAccountId:0,
    campaignStep:{
      id:0,//for first time, this field can be skipped, but for updates this value should be >0
      campaignId:0,
      type:'EMAIL',
      stepNumber:1,
      delayAsString:'',
          emails:[//At a Time more than one emails can be passed in the 
              {
                  id:0, //for first time, this field can be skipped, but for updates this value should be >0
                  campaignId:0,
                  subject:'',
                  body:'',
              }
            ]
    }
   }
  id:any;
  steps=[];
  campaign={
    id:undefined
  }
  user={
    id:undefined
  }
  userAccoount={
    id:undefined
  }
  stepNumber=0;
  dayNumber=1;
  constructor(private route:ActivatedRoute,private outreachService:OutreachService, private modalService: NgbModal,
    config: NgbModalConfig,private formBuilder:FormBuilder) {
    
   }
   days=day;
   hours=hour;
   minutes=minute;
   AddMessageForm = this.formBuilder.group({

     subject: ['', [Validators.required]],
     message: ['', [Validators.required]],
   });
   DelayStringForm=this.formBuilder.group({
     day: [1, [Validators.required]],
     hour:[0,[Validators.required]],
     minute:[0,[Validators.required]],
   })

  ngOnInit(): void {
    this.campaign.id= this.route.snapshot.queryParamMap.get('id');
    console.log(this.campaign.id)
    this.listCampaignsById();
    this.payload.userId=this.user.id;
    this.payload.userAccountId=this.userAccoount.id;
    this.payload.campaignStep.campaignId=this.campaign.id;
   
    this.payload.campaignStep.emails[0].campaignId=this.campaign.id;
  }
  open(content) {
    console.log(this.AddMessageForm.value);
    this.DelayStringForm.reset();
    this.DelayStringForm.controls['hour'].setValue(0);
    this.DelayStringForm.controls['minute'].setValue(0);
    console.log(content);
    
    this.modalService.open(content,{size:'xl',backdrop:'static' })
    this.AddMessageForm.reset();
    if(this.addedDelay==false && !this.edit){
      var incrementDay;
 
    incrementDay=this.dayNumber
     this.DelayStringForm.controls['day'].setValue(incrementDay);
     var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);
     this.payload.campaignStep.delayAsString=delayString;
     this.delayString=delayString;
     
    }
    else if(this.edit){
      this.DelayStringForm.controls['day'].setValue(this.dayNumber)
    }
    else if(!this.edit){
      this.DelayStringForm.controls['day'].setValue(this.dayNumber)
    }

    
    console.log(content);
  }
  openDelay(content) {
    console.log(content);
    
    this.modalService.open(content, {size:'md' , centered:true,backdrop:'static'})
  }

listCampaignsById(){
  this.user=JSON.parse(localStorage.getItem('user'));
  this.userAccoount=JSON.parse(localStorage.getItem('userprofile'));
    this.outreachService.getCampaignsById(this.user.id,this.userAccoount.id,this.campaign).subscribe({
      next: (res: any) => {
        console.log(res);
        this.steps=res.steps;
        this.stepNumber=res.steps.length+1;
        var duration=this.getActualValue(res.steps[res.steps.length-1].delayAsString);
        this.dayNumber=duration.day+2;
        this.payload.campaignStep.stepNumber=this.stepNumber;
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
}

saveMessage(){
  if(this.edit){
    this.edit=false;
    console.log("ifffffffffff")
    var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);
    this.payload.campaignStep.delayAsString=delayString;
  this.payload.campaignStep.emails[0].subject=this.AddMessageForm.controls['subject'].value;
  this.payload.campaignStep.emails[0].body=this.AddMessageForm.controls['message'].value;
  this.payload.campaignStep.emails[0].campaignId=this.campaign.id;
    this.outreachService.addMessageToCampaign(this.payload).subscribe({
      next: (res: any) => {
        console.log(res);
    
        this.listCampaignsById()
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
    
  }
  else{
    console.log("elseeeeeeee")
  
  var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);
  this.payload.campaignStep.delayAsString=delayString;
    this.payload.campaignStep.stepNumber=this.stepNumber;
 // this.stepNumber=this.payload.campaignStep.stepNumber;
 this.payload.campaignStep.id=0;
 this.payload.campaignStep.emails[0].id=0;
  this.payload.campaignStep.campaignId=this.campaign.id;
  this.payload.campaignStep.emails[0].subject=this.AddMessageForm.controls['subject'].value;
  this.payload.campaignStep.emails[0].body=this.AddMessageForm.controls['message'].value;
  this.payload.campaignStep.emails[0].campaignId=this.campaign.id;
  this.outreachService.addMessageToCampaign(this.payload).subscribe({
    next: (res: any) => {
      console.log(res);
      this.payload.campaignStep.campaignId=res.campaignId;
      this.payload.campaignStep.stepNumber=res.stepNumber;
      console.log(this.steps)
      this.listCampaignsById()
    },
    error: (error: any) => {
      alert(error);
      console.log(error);
    },
  });
  
}
}
getDelayString(days: string, hours: string, minutes: string): string | null {
  if (/^\d$/.test(days)) {
    days = `0${days}`;
  }
  if (/^\d$/.test(hours)) {
    hours = `0${hours}`;
  }

  if (/^\d$/.test(minutes)) {
    minutes = `0${minutes}`;
  }
  return `${days}dd${hours}hh${minutes}mi`;
}
getActualValue(dateString) {
  let duration: any = { day: 0, hour: 0, minute: 0 };
  let day = dateString.substr(0, 2);
  duration.day = +day;

  let hour = dateString.substr(4, 2);
  duration.hour = +hour;

  let minute = dateString.substr(8, 2);
  duration.minute = +minute;
  console.log(duration);

  return duration;

}
editStep(step,
  email,
  updateContent,
  delayAsString){
    this.edit=true;
    this.previousStepNumber=this.stepNumber
    this.AddMessageForm.controls['subject'].setValue(email.subject);
    this.AddMessageForm.controls['message'].setValue(email.body);
  this.modalService.open(updateContent, {size:'xl' });
  console.log(step,email,updateContent,delayAsString);
  this.payload.campaignStep.delayAsString=delayAsString;
  this.payload.campaignStep.stepNumber=step.stepNumber;
  this.stepNumber=step.stepNumber;
  var duration=this.getActualValue(delayAsString)
  this.previousDayNumber=this.dayNumber;
  this.dayNumber=duration.day;
  this.DelayStringForm.controls['day'].setValue(this.dayNumber)
  this.payload.campaignStep.id=step.id;
  this.payload.campaignStep.campaignId=step.campaignId;
  this.payload.campaignStep.emails[0].id=step.id;
  this.payload.campaignStep.emails[0].campaignId=step.campaignId;
}
addedDelay=false
delayString='';
addDelayString(){
  this.addedDelay=true;
  var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);
  this.payload.campaignStep.delayAsString=delayString;
  this.dayNumber=this.DelayStringForm.controls['day'].value;
  this.delayString=delayString;
  console.log(this.DelayStringForm.value)
}
}