import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import Swal from 'sweetalert2';
import { updateLabelModal } from './modal';
@Component({
  selector: 'app-update-labels',
  templateUrl: './update-labels.component.html',
  styleUrls: ['./update-labels.component.scss']
})

export class UpdateLabelsComponent implements OnInit {

  previousLabels = new FormControl();
  user={
    id:undefined
  }
  userAccount={
    id:undefined
  }
  page=0;
  limit=50;
  order_By='modifiedAt';
  allLabels=[]
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UpdateLabelsComponent>,
    private outreachService:OutreachService
    
  ) { 
    console.log(editData);
  }

  ngOnInit(): void {
    this.previousLabels.setValue(this.editData.labels)
    this.user=JSON.parse(localStorage.getItem('user'));
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
    this.fetchAllLabels();
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
      labels: this.previousLabels.value,
    }
    
   }
fetchAllLabels(){
  this.outreachService.getLabels(this.user.id,this.userAccount.id,this.page,this.limit,this.order_By).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.allLabels=res.content;
    },
    error:(error:any)=>{
      console.log(error);
      
    }
  })
}
compareFn(o1: any, o2: any): boolean {
  return o1 && o2 ? o1.name === o2.name : o2 === o2;
}
selectedOptions = false;

onPreviousLabelRemoved(cat: string) {
  const categories = this.previousLabels.value as string[];
  this.removeFirst(categories, cat);
}
private removeFirst(categories, cat): void {
  this.selectedOptions = true;
  const index = categories.indexOf(cat);
  if (index !== -1) {
    categories.splice(index, 1);
    this.previousLabels.setValue(categories);
    this.payload.campaign.labels=this.previousLabels.value;
  }
}
updateLabels(){
  this.payload.campaign.labels=this.previousLabels.value;
  this.payload.userId=this.user.id;
  this.payload.userAccountId=this.userAccount.id;
  this.outreachService.updateCampaign(this.payload,1).subscribe({
    next:(res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Labels Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      this.dialogRef.close("submit");
    },
    error: (err) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Labels Add Failed!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  this.dialogRef.close('submit')
}
}
