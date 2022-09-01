import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { UsersComponent } from '../choose_profile/users/users.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { StripeComponent } from '../stripe/stripe.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData:any;
  created=0;
  stepper=false;
  completedStep1:boolean;
  completedStep2:boolean;
  completedStep3:boolean;
  completedStep4:boolean;
  user:any;
  userAccount={
    id:undefined
  }
  steps:any;
  istrialPlan=true;
  constructor(public dialogUser: MatDialog,private dashboardService:DashboardService,private router:Router,private authService:AuthService,) { }
  ngOnInit(): void {
  //   this.user=JSON.parse(localStorage.getItem('user'));
  //  if(this.user===undefined){
  //   this.user=this.authService.userModel;
  //   console.log(this.user);
  //  }
  //  if(!this.user.trialPlan){
  //   console.log(this.user);
  //   this.istrialPlan=false;
  //   this.openDialogueStripe(this.user.email);
  //  }
    if(history.state.mode=='client')
    {
      this.steps=JSON.parse(localStorage.getItem('user'));
        this.completedStep1=this.steps.mailAccountconnected;
        this.completedStep2=this.steps.prospectsAdded;
        this.completedStep3=this.steps.prospectLabelAdded;
        this.completedStep4=this.steps.campaignCreated;
        if(!this.completedStep1||!this.completedStep2||!this.completedStep3||!this.completedStep4){
          this.stepper=true;
        }
        this.fetchDashboardData();
    }
        
    
    if(history.state.mode=='agency')
    {

      this.openDialogue();
    }
    else{
      this.user=JSON.parse(localStorage.getItem('user'));
            this.userAccount=JSON.parse(localStorage.getItem('userprofile'))
            this.fetchDashboardData();
    }
 
 
  }
  
  openDialogue(): void {
    const dialogRef = this.dialogUser.open(UsersComponent, {
      width: '80%',
      height: '80%',
      disableClose: true,
     

    });
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.user=JSON.parse(localStorage.getItem('user'));
        this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
        this.steps=JSON.parse(localStorage.getItem('user'));
    this.completedStep1=this.steps.mailAccountconnected;
    this.completedStep2=this.steps.prospectsAdded;
    this.completedStep3=this.steps.prospectLabelAdded;
    this.completedStep4=this.steps.campaignCreated;
    if(!this.completedStep1||!this.completedStep2||!this.completedStep3||!this.completedStep4){
      this.stepper=true;
    }
        this.fetchDashboardData();
      }
    })
  }
  fetchDashboardData(){
    this.dashboardService.getDashboardData(this.user.id,this.userAccount.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.userData=res;
        
        for(let i=0;i<this.userData.outreaches.length;i++){
          if(this.userData.outreaches[i].status==='created'){
            this.created=this.userData.outreaches[i].total;
          }
        }

      },
     error:(error:any)=>{
      console.log(error);
     }
    })
  }
  
  goTolinkAccounts(event){
    console.log(event);
    if(event.selectedIndex==1){
    this.router.navigate(['home/settings/mailaccounts']);
     this.completedStep1=this.dashboardService.completedStep1;
    }
    else if(event.selectedIndex==2){
      this.router.navigate(['home/contacts'])
     
      }
   else if(event.selectedIndex==3){
        this.router.navigate(['home/prospects'])
        
        }
      else if(event.selectedIndex==4){
          this.router.navigate(['home/outreach'])
          
          }
  }
  openDialogueStripe(email): void {
    const dialogRef = this.dialogUser.open(StripeComponent, {
      disableClose: true,
      data:email
    });
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.router.navigate(["auth"]);
        window.location.reload();
      }
      })
  }
}
