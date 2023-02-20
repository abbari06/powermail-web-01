import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { day,hour,minute } from './models/delay-string';
import {  FormBuilder,FormGroup,Validators } from '@angular/forms';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { payloadStep3 } from '../../payload-modals/step-3';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class StepThreeComponent implements OnInit {

  constructor(  private modalService: NgbModal,
    config: NgbModalConfig,private formBuilder:FormBuilder,private outreachService:OutreachService,private route:ActivatedRoute,private router:Router) { 
    
    }
    user={
      id:undefined
    }
    userAccount={
      id:undefined
    }
    id:any;
    previousStepNumber:number;
    previousDayNumber:number;
    steps=[];
    delayString=""
    step:number;
    delayValue:string;
    panelOpenState=false;
    dayNumber=0;
    hour:null;
    minute:null;
    stepNumber=1;
    mailStepNumber=0;
   payload:payloadStep3={
    userId:0,
    userAccountId:0,
    campaignStep:{
      id:0,
      campaignId:0,
      type:'EMAIL',
      stepNumber:0,
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
   campaign={
    id:0
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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.id=this.route.snapshot.queryParamMap.get('id');
    this.listCampaignsById();
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
  saveMessage(){
    if(this.edit){
      this.edit=false;
      console.log("ifffffffffff");
      var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);
      this.payload.campaignStep.delayAsString=delayString;
    this.payload.campaignStep.emails[0].subject=this.AddMessageForm.controls['subject'].value;
    this.payload.campaignStep.emails[0].body=this.AddMessageForm.controls['message'].value;
    this.payload.campaignStep.emails[0].campaignId=this.outreachService.payload.campaign.id;
      this.outreachService.addMessageToCampaign(this.payload).subscribe({
        next: (res: any) => {
          console.log(res);
        // this.listCampaignsById()
          //this.steps=res;
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
    this.payload.campaignStep.emails[0].subject=this.AddMessageForm.controls['subject'].value;
    this.payload.campaignStep.emails[0].body=this.AddMessageForm.controls['message'].value;
    
     //this.payload.campaignStep.id=this.outreachService.payload.campaign.id;
   // this.payload.campaignStep.emails[0].id=0;
    this.outreachService.addMessageToCampaign(this.payload).subscribe({
      next: (res: any) => {
        console.log(res);
        //this.stepNumber=res.stepNumber+1;
        this.payload.campaignStep.campaignId=res.campaignId;
        this.payload.campaignStep.stepNumber=res.stepNumber;
       //this.step=res.stepNumber;
        //this.delayValue=res.delayAsString;
        console.log(this.steps)
        //this.mailStepNumber=res.stepNumber;
        this.listCampaignsById()
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
    
  }
  }
  addMessage(){
    var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);

  }
  addedDelay=false;
  edit=false;
  addDelayString(){
    this.addedDelay=true;
    var delayString=this.getDelayString(this.DelayStringForm.controls['day'].value,this.DelayStringForm.controls['hour'].value,this.DelayStringForm.controls['minute'].value);
    this.payload.campaignStep.delayAsString=delayString;
    this.dayNumber=this.DelayStringForm.controls['day'].value;
    this.delayString=delayString;
    console.log(this.DelayStringForm.value)
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
  listCampaignsById(){
    this.campaign.id=this.id;
    this.payload.userId=this.user.id
    this.payload.userAccountId=this.userAccount.id;
    this.outreachService.getCampaignsById(this.payload.userId,this.payload.userAccountId,this.campaign).subscribe({
      next: (res: any) => {
        this.outreachService.payload
        console.log('listttttt')
        console.log(res);
        this.payload.campaignStep.emails[0].campaignId=this.campaign.id;
        this.payload.userId=this.user.id;
        this.payload.userAccountId=this.userAccount.id;
        this.payload.campaignStep.campaignId=this.campaign.id;
        this.steps=res.steps;
        this.stepNumber=this.steps.length+1;
        console.log("sno",this.stepNumber);
        console.log(this.steps);
        if(res.steps.length!=0){
          this.delayString=res.steps[res.steps.length-1].delayAsString;
          var duration=this.getActualValue(this.delayString);
          this.dayNumber=duration.day+2;
      
        }else{
          this.delayString="00dd00hh00mi"
          var duration=this.getActualValue(this.delayString);
          this.dayNumber=duration.day+1;
        }
        
        //this.steps=[]
        
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
  }
  backToStepTwo(){
    this.router.navigate(['/home/outreach/addcampaign/steptwo'],{queryParams:{id:this.id}}); 
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
  closeQuill(){
    // this.stepNumber=this.previousStepNumber;
    // this.dayNumber=this.previousDayNumber;
  }
  next(){
    this.router.navigate(['/home/outreach/addcampaign/stepfour'],{ queryParams: {id:this.id}})
  }
}
