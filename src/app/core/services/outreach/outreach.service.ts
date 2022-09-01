import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { payload } from 'src/app/features/home-module/pages/outreach/payload-modals/step1-2';
@Injectable({
  providedIn: 'root',
})
export  class  OutreachService {
  step2=2;
  step1=1;
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  campaign={
    id:undefined
  }
  API_BASE_URL = environment.API_BASE_URL;
  payload:payload={
    userId:0,
    userAccountId:0,
    campaign:{
      id:0,
      title:'',
      status:'created',
      description:'',
      mailAccountId:'',
      type:'',
      schedule:{
      },
    labels:[],
    steps:[]
    }
  }
  constructor(private http: HttpClient,private router:Router) {}
  getAccountDetails(userId, userAccountId) {
    return this.http.post(this.API_BASE_URL + 'users/account/get', {
      userId,
      userAccountId,
    });
  }
  listAllSchedules(userId, userAccountId) {
    return this.http.post(this.API_BASE_URL + 'users/account/schedules/list', {
      userId,
      userAccountId,
    });
  }
  getLabels(userId,userAccountId,page,limit,orderBy){
    return this.http.post(this.API_BASE_URL+'users/prospects/labels/list',{
      userId,userAccountId,page,limit,orderBy
    })
  }
  getProspectesByLabels(userId,userAccountId,prospectLabels,page,limit,orderBy){
    return this.http.post(this.API_BASE_URL+'users/prospects/list',{
      userId,userAccountId,page,limit,orderBy,prospectLabels
    })
  }
  addCampaign(payload,step){
    this.user=JSON.parse(localStorage.getItem('user'));
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
    this.http.post(this.API_BASE_URL+'users/outreachcampaigns/add?wizardstep='+step,
      payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.payload.userId=this.user.id
          this.payload.userAccountId=this.userAccount.id;
          this.payload.campaign.title=res.title;
          this.payload.campaign.description=res.description;
          this.payload.campaign.mailAccountId=res.mailAccountId;
          this.payload.campaign.id=res.id;
          this.payload.campaign.type=res.type;
          this.id=res.id;
          this.router.navigate(['/home/outreach/addcampaign/steptwo'],{ queryParams: {id:res.id}})
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  addCampaignStepTwo(){
    this.http.post(this.API_BASE_URL+'users/outreachcampaigns/add?wizardstep='+this.step2,this.payload).subscribe({
      next: (res: any) => {
         this.payload.campaign.schedule=res.schedule;
       // this.payload.campaign.schedule=res.schedule.name;
        this.payload.campaign.labels=res.labels;
        console.log(res);
        this.router.navigate(['/home/outreach/addcampaign/stepthree'],{ queryParams: {id:res.id}})
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
  }
  backToStepOne(){
    this.http.post(this.API_BASE_URL+'users/outreachcampaigns/add?wizardstep='+this.step1,this.payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/home/outreach/addcampaign/stepone'], { state: { mode: 'back' } }); 
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
  }
  addMessageToCampaign(payload){
    return this.http.post(this.API_BASE_URL+'users/outreachcampaigns/steps/add',payload)
  }
  listAllCampaigns(userId,userAccountId,page,limit,orderBy){
    // this.user=JSON.parse(localStorage.getItem('user'));
    // this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
    return this.http.post(this.API_BASE_URL+'users/outreachcampaigns/list',{userId,userAccountId,page,limit,orderBy})
  }
  getCampaignsById(userId,userAccountId,campaign){

    return this.http.post(this.API_BASE_URL+'users/outreachcampaigns/get?campaignId='+campaign.id,{userId,userAccountId,campaign})
    
  }
  id:any;
  backToStepTwo(){
    this.router.navigate(['/home/outreach/addcampaign/steptwo'], {queryParams :{id:this.id}}); 
   
  }
  applySettings(payload){
    return this.http.post(this.API_BASE_URL+'users/outreachcampaigns/settings/update',payload)
  }
  updateCampaign(payload,step){
    return this.http.post(this.API_BASE_URL+'users/outreachcampaigns/add?wizardstep='+step,
      payload)
  }
  getCampaignsByLabels(userId,userAccountId,page,limit,orderBy,prospectLabels){
    this.user=JSON.parse(localStorage.getItem('user'));
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
    return this.http.post(this.API_BASE_URL+'users/outreachcampaigns/list',{userId,userAccountId,page,limit,orderBy,prospectLabels})
  }
}
