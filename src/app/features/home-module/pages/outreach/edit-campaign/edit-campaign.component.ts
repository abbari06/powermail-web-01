import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { UpdateLabelsComponent } from './update-labels/update-labels.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';


@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {
  gridColumn = 4;
id:any
user={
  id:undefined
}
userAccount={
  id:undefined
}
campaign={
  id:undefined
}
campaignData:any;
campaignName=''
previewData=[];
title='';
email="";
labels=[];
steps=[];
timeZone='';
scheduleName='';
showdata=false;
schedules=[];

  constructor(private route :ActivatedRoute,private router:Router,private outreachService:OutreachService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.queryParamMap.get('id');
    this.campaign.id=this.id;
    console.log(this.id);
    this.listCampaignsById();
  }
  listCampaignsById(){
    this.user=JSON.parse(localStorage.getItem('user'))
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'))
    this.outreachService.getCampaignsById(this.user.id,this.userAccount.id,this.campaign).subscribe({
      next: (res: any) => {
        console.log('listttttt')
        console.log(res);
        this.campaignData=res;
        this.previewData = res.schedule.schedules;
        this.schedules=res.schedule;
        console.log(this.previewData);
        this.campaignName=res.title
        this.title=res.title;
        this.email=res.mailAccountId;
        this.labels=res.labels;
        this.steps=res.steps;
        this.timeZone=res.schedule.timezone;
        this.scheduleName=res.schedule.name;
        this.showdata=true;
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
  }
  editLabels(){
      const dialogRef = this.dialog.open(UpdateLabelsComponent, {
        width: '60%',
        height: '35%',
        data: this.campaignData,
      });
      dialogRef.afterClosed().subscribe(() => {
        
          this.listCampaignsById();
        
      });
  }
  editSchedule(){
    const dialogRef = this.dialog.open(UpdateScheduleComponent, {
        width: '60%',
        //height: '30%',
        data: this.campaignData,
      });
      dialogRef.afterClosed().subscribe((val) => {
        
          this.listCampaignsById();
       
      });
  }
}
