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
  totalOutreaches=0;
  created=0;
  stepper=false;
  completedStep1:boolean;
  completedStep2:boolean;
  completedStep3:boolean;
  completedStep4:boolean;
  user={
    id:undefined,
    email:undefined,
    trialPlan:undefined,
    accounttype:undefined
  };
  userAccount={
    id:undefined
  }
  steps:any;
  istrialPlan=true;
  constructor(public dialogUser: MatDialog,private dashboardService:DashboardService,private router:Router,private authService:AuthService,) { }
  ngOnInit(): void {
    console.log(history.state.mode,history.state.plan);
    if ("user" in localStorage) {
      this.user=JSON.parse(localStorage.getItem('user'));
      this.userAccount=JSON.parse(localStorage.getItem('userprofile'))
      if(this.user.trialPlan==false){
        // console.log(this.user.trialPlan);
           
             this.openDialogueStripe(this.authService.userModel.email);
            
        }
        else if(this.user.accounttype=="client" && this.user.trialPlan )
         {
          
             console.log("client");
            
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
          
         
       else if(this.user.accounttype=="agency")
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
           // if(history.state.plan==true || this.user.trialPlan){
           //   console.log("agency");
           
          // this.openDialogue();
          // }
           
         }

  } else {
      
   
  if(history.state.plan==false){
   // console.log(this.user.trialPlan);
      
        this.openDialogueStripe(this.authService.userModel.email);
       
   }
   else if(history.state.mode=='client')
    {
      if(history.state.plan==true){
        console.log("client");
       
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
     
    }
  else if(history.state.mode==="agency")
    { 
      // if(history.state.plan==true || this.user.trialPlan){
      //   console.log("agency");
      
      this.openDialogue();
     // }
      
    }
    // if(history.state.plan!==true && !this.user.trialPlan){
    //   console.log(this.authService.userModel.email,history.state.plan,this.user.trialPlan);
      
    // //  this.openDialogueStripe(this.authService.userModel.email)
    // }
    else{
      this.user=JSON.parse(localStorage.getItem('user'));
            this.userAccount=JSON.parse(localStorage.getItem('userprofile'))
            this.fetchDashboardData();
  }
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
          this.totalOutreaches+=this.userData.outreaches[i].total;
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
    console.log("dashboard");
    
    const dialogRef = this.dialogUser.open(StripeComponent, {
      disableClose: true,
      data:email
    });
    dialogRef.afterClosed().subscribe(()=>{
      window.location.reload()
      this.router.navigateByUrl('auth/login')
  //     console.log(success);
  //      if(success){
  //       console.log(success);
        
  //       history.state.plan=true;
  //       this.authService.userModel.trialPlan=true;
  //       this.user=JSON.parse(localStorage.getItem('user'));
  //       if(this.user){
  //         this.user.trialPlan=true;
  //         localStorage.setItem('user',JSON.stringify(this.user));
  //       }
  //       if(history.state.mode=='client' || this.user.accounttype==="client" )
  //       {
  //         if(history.state.plan==true || this.user.trialPlan){
  //           console.log("client");
           
  //           this.steps=JSON.parse(localStorage.getItem('user'));
  //             this.completedStep1=this.steps.mailAccountconnected;
  //             this.completedStep2=this.steps.prospectsAdded;
  //             this.completedStep3=this.steps.prospectLabelAdded;
  //             this.completedStep4=this.steps.campaignCreated;
  //             if(!this.completedStep1||!this.completedStep2||!this.completedStep3||!this.completedStep4){
  //               this.stepper=true;
  //             }
  //             this.fetchDashboardData();
  //         }
         
  //       }
  //     if(history.state.mode=='agency'|| this.user.accounttype==="agency")
  //       {
          
  //         this.openDialogue();
  //         }
          
      
  //    // this.router.navigateByUrl('auth/login');
  //  // this.router.navigate(["auth"])
      
    //   }
       
      })
      
  }
  
}
