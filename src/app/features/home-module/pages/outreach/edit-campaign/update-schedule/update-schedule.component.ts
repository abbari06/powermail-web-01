import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import Swal from 'sweetalert2';
import { updateLabelModal } from '../update-labels/modal';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.scss']
})
export class UpdateScheduleComponent implements OnInit {
  schedule=new FormControl();
  allSchedules=[];
  user={
    id:undefined
  }
  userAccount={
    id:undefined
  }
  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
  private dialogRef: MatDialogRef<UpdateScheduleComponent>,
  private outreachService:OutreachService) { }

  ngOnInit(): void {
    this.schedule.setValue(this.editData.schedule)
    this.fetchAllSchedules();
  }
  fetchAllSchedules() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.outreachService
      .listAllSchedules(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.allSchedules = res;
          console.log(this.allSchedules)
         
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  payload:updateLabelModal={
    userId:this.user.id,
    userAccountId:this.userAccount.id,
    campaign:{
      id: this.editData.id,
      title: this.editData.title,
      description: this.editData.description,
      mailAccountId: this.editData.mailAccountId,
      steps: this.editData.steps,
      settings: this.editData.settings,
      type: 'onetime',
      status: this.editData.status,
      schedule: this.editData.schedule,
      labels: this.editData.labels,
    }
    
   }
  compareColors(p1: any, p2: any): boolean {
    if (p1 && p2) {
        return p1.name === p2.name;
    }
    return false;
}
updateSchedule(){
this.payload.campaign.schedule=this.schedule.value;
this.payload.userId=this.user.id;
this.payload.userAccountId=this.userAccount.id;
this.outreachService.updateCampaign(this.payload,1).subscribe({
  next:(res:any)=>{
    console.log(res);
    
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Schedule Added Successfully',
      showConfirmButton: false,
      timer: 1500,
    });
    this.dialogRef.close("submit");
  },
  error: (err) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Schedule Add Failed!',
      showConfirmButton: false,
      timer: 1500,
    });
  },
});

this.dialogRef.close('submit')
}
}
