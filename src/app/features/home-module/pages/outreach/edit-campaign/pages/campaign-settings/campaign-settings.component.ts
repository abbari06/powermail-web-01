import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { settingspayload } from './settings-payload';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.scss']
})
export class CampaignSettingsComponent implements OnInit {
 tags=new FormControl();
 recievedAllMessages=new FormControl();
 previousSettings=[]
 hasSettings=false;
 openTracking=true;
 linkTracking=true;
 moveBouncesToDnmList=true;
  payload:settingspayload={
    userId:0,
    userAccountId:0,
    campaign:{
      id:0, //id of the campaign for which settings are being added
      settings:{
          maxEmailsPerDay:0,
          enableLinkClickTracking:true,
          enableOpenTracking:true,
          moveBouncesToDnmList:true,
          prospect_actions:[
              {

                  trigger:'',  //[OPENED-ANY,REPLIED-ANY,CLICKED-ANY]
                  action:'',     //[FINISHED,APPLYLABEL]
                  labels:[
                  ]
              },
             
              
          ] ,
          prospectCampaignFinishedAction: {
              action:'',     //[TOTALFINISHED,APPLYLABEL],incase of TotalFinished, labels field will not be passed
              labels:[
                    
                  ]
          }
      }
  }
  }
user={
  id:undefined
}
userAccount={
  id:undefined
}
campaign={
  id:undefined
}

allLabels=[];
senderMailAccountId="";
 addForm:FormGroup;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private outreachService:OutreachService) {
    this.addForm = this.fb.group({
     maximumEmailsPerDay:[],
     linkTraking:[],
     EnableTraking:[],
      prospect_actions: this.fb.array([]),
     anotherDropdown:[],
     emailBounce:[]
    });
  }
get actions():FormArray{
  return this.addForm.get("prospect_actions") as FormArray
}

    newAction():FormGroup{
      return this.fb.group({
        trigger:"",
        action:"",
        labels:[], 
   
      })

    }
    addActions(){
      this.actions.push(this.newAction());
    }
    removeActions(i:number) {
      this.actions.removeAt(i);
    }
     
    onSubmit(){
      console.log(this.addForm.value);
    }
 
  ngOnInit(): void {
   this.addActions()
    this.campaign.id=this.route.snapshot.queryParamMap.get('id');
    console.log(this.campaign.id)
    this.listCampaignsById();
    this.getAllLabels();
  }
  listCampaignsById(){
    this.user=JSON.parse(localStorage.getItem('user'));
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
      this.outreachService.getCampaignsById(this.user.id,this.userAccount.id,this.campaign).subscribe({
        next: (res: any) => {
          console.log(res);
          this.senderMailAccountId=res.mailAccountId;
          if(res.settings!=null){
            this.hasSettings=true;
            this.addForm.controls['maximumEmailsPerDay'].setValue(res.settings.maxEmailsPerDay);
            this.openTracking=res.settings.enableOpenTracking;
            this.linkTracking=res.settings.enableLinkClickTracking;
            this.moveBouncesToDnmList=res.settings.moveBouncesToDnmList;
            this.previousSettings=res.settings.prospect_actions;
            this.payload.campaign.settings.prospectCampaignFinishedAction.action=res.settings.prospectCampaignFinishedAction.action;
            this.recievedAllMessages.setValue(res.settings.prospectCampaignFinishedAction.action)
            this.tags.setValue(res.settings.prospectCampaignFinishedAction.labels);
            if(this.recievedAllMessages.value==='tags'){
              this.applyLabels=true;
            }
            for (const {index,value,} of res.settings.prospect_actions.map((value, index) => ({
              index,
              value,
            }))) {
              console.log(index); // 0, 1, 2
              console.log(value); // 9, 2, 5
              this.onDoSelect(value.action,index);
              this.addActions();
              this.addForm.controls['prospect_actions'].patchValue(
              res.settings.prospect_actions
              );
              console.log(this.addForm.controls['prospect_actions'].value);
            }
          }
          
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  toggleLink(event){
    console.log(event);
    this.payload.campaign.settings.enableLinkClickTracking=event.checked
    
  }
  toggleOpen(event){
    this.payload.campaign.settings.enableOpenTracking=event.checked;
  }
  onWhenSelect(event,i){
    console.log(event)
    //this.payload.campaign.settings.prospect_actions[i].trigger=event.value;
  }
  applyLabels=false
  showLabels=[];
  onDoSelect(event,i){
    console.log(event,i);
    if(event==='labels'){
      this.showLabels[i]=true;

    }
    else{
      this.showLabels[i]=false;
    }
    console.log(this.showLabels);
    
  }
  page=0;
  limit=20;
  orderBy='-modifiedAt'
  getAllLabels(){
    this.outreachService.getLabels(this.user.id,this.userAccount.id,this.page,this.limit,this.orderBy).subscribe({
      next:(res:any)=>{
        this.allLabels=res.content;
        console.log(this.allLabels);
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    })
  }
  onLabelSelect(event,i:any){
    console.log(event,i);

    //this.payload.campaign.settings.prospect_actions[i].labels.push(event.value[i]);
    console.log(this.addForm.controls['prospect_actions'].value);
    //this.selectedLabels.setValue(this.addForm.controls['actions'][i].value);
   
  }
  onMark(event){
    this.payload.campaign.settings.prospectCampaignFinishedAction.action=event.value;
    if(event.value==="tags"){
      this.applyLabels=true;
    }
    else{
      this.applyLabels=false;
    }
   
  }
  compareObjects(o1: any, o2: any) {
    console.log(o2);

    if (o1.name == o2.name && o1.id == o2.id) return true;
    else return false;
  }
//   compareFn(user1: any, user2: any) {
//     return user1 && user2 ? user1.id === user2.id : user1 === user2;
// }
  onBounceSelect(event){
    console.log(event);
    
    this.moveBouncesToDnmList=event.checked;
  }

  applySettings(){
    this.payload.campaign.settings.prospect_actions=this.addForm.controls['prospect_actions'].value;
    this.payload.userId=this.user.id;
    this.payload.userAccountId=this.userAccount.id;
    this.payload.campaign.id=this.campaign.id;
    this.payload.campaign.settings.maxEmailsPerDay=this.addForm.controls['maximumEmailsPerDay'].value;
    this.payload.campaign.settings.prospectCampaignFinishedAction.labels=this.tags.value;
    this.payload.campaign.settings.moveBouncesToDnmList=this.moveBouncesToDnmList;
    this.outreachService.applySettings(this.payload).subscribe({
      next:(res:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Settings Applied Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
      },
      error: (error: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Contact Add Failed!',
          showConfirmButton: false,
          timer: 1500,
        });
        alert(error);
        console.log(error);
      },
    })
  }
  onPreviousLabelRemoved(label:any,i:any) {
    console.log(label,i)
    const arrayControl = <FormArray>this.addForm.controls['prospect_actions'].value[i].labels;
    console.log(arrayControl);
    
   
    let actions = this.addForm.controls['prospect_actions'].value[i].labels as string[];
   
        this.removeFirst(actions,label,i);
      
    }
   
    private removeFirst(categories, cat,i): void {
      const index = categories.indexOf(cat);
      if (index !== -1) {
        categories.splice(index, 1);
        //this.addForm.setValue(categories);
        this.addForm.controls['prospect_actions'].value.labels.setValue(
          categories
          );
          // if(this.addForm.controls['prospect_actions'].value.labels.length==0){
          //   this.addForm.controls['prospect_actions'].value[i].action='finished';
          //   this.showLabels[i]=false;
          //   console.log(i);
            
          // }
      }
      
     
    }
    onLabelRemoved(cat: string) {
      const categories = this.tags.value as string[];
      this.remove(categories, cat);
    }
    private remove(categories, cat): void {
      
      const index = categories.indexOf(cat);
      if (index !== -1) {
        categories.splice(index, 1);
        this.tags.setValue(categories);
       // console.log(this.tags); 
      }
      

      // if(this.tags.value.length==0){
      //   this.recievedAllMessages.setValue('mark as finished');
      //   this.applyLabels=false;
      // }
    }
   
  }
 

