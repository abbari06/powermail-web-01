import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {
  campaign={
    id:undefined
  }
  user={
    id:undefined
  }
  userAccount={
    id:undefined
  }
  previewData:any
  title=""
  email="";
  labels=[];
  steps:any;
  schedules:any=[];
  timeZone=""
  scheduleName=""
  showdata=false;
  constructor(private outreachService:OutreachService,private router:Router,private route:ActivatedRoute) { }
  id:any;
  ngOnInit(): void {
    this.id=this.route.snapshot.queryParamMap.get('id');
    this.listCampaignsById();
  }
  listCampaignsById(){
    this.user=JSON.parse(localStorage.getItem('user'))
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'))
    this.campaign.id=this.id
    this.outreachService.getCampaignsById(this.user.id,this.userAccount.id,this.campaign).subscribe({
      next: (res: any) => {
        console.log('listttttt')
        console.log(res);
        this.previewData = res.schedule.schedules;
        
        console.log(this.previewData);
        
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
  save(){
    this.router.navigate(['home/outreach/editcampaign/messages'],{ queryParams: {id:this.id}});
  }
  back(){
    this.router.navigate(['/home/outreach/addcampaign/stepthree'],{ queryParams: {id:this.id}})
  }
}
