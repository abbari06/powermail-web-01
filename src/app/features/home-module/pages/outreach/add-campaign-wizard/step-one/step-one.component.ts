import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class StepOneComponent implements OnInit {
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  campaign={
    id:undefined
  }
  step=1;

  constructor(
    private outreachService: OutreachService,
    private formBuilder: FormBuilder,
    private router:Router,private route:ActivatedRoute
  ) {
    
  }
  allMailAccounts = [];
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    if (this.route.snapshot.queryParamMap.get('id')){
      this.campaign.id=this.route.snapshot.queryParamMap.get('id');
      this.outreachService.getCampaignsById(this.user.id,this.userAccount.id,this.campaign).subscribe({
        next: (res: any) => {
          (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['id'].setValue(this.campaign.id);
          (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['title'].setValue(res.title);
      (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['description'].setValue(res.description);
      (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['mailAccountId'].setValue(res.mailAccountId);
      (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['schedule'].setValue(res.schedule);
      (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['labels'].setValue(res.labels);
      (<FormGroup>this.AddCampaignFormOne.controls['campaign']).controls['steps'].setValue(res.steps);
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
     
    }
    this.fetchAllMailAccounts();
  }
  AddCampaignFormOne = this.formBuilder.group({
    userId:[],
    userAccountId:[],
    campaign : this.formBuilder.group({
      id:[undefined],
      title: ['',[Validators.required]],
    description: ['', [Validators.required]],
    mailAccountId: ['', [Validators.required]],
    type:['onetime',],
    schedule:[{}],
    labels:[ []  ],
    steps:[]
    })

});
  fetchAllMailAccounts() {
    this.outreachService
      .getAccountDetails(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          this.allMailAccounts = res.mailaccounts;
          console.log(this.allMailAccounts);
          // this.AddCampaignFormOne.controls['mailAccount'].setValue(
          //   this.allMailAccounts
          // );
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  
  createCampaign(){
    this.AddCampaignFormOne.controls['userId'].setValue(this.user.id);
    this.AddCampaignFormOne.controls['userAccountId'].setValue(this.userAccount.id);
    this.outreachService.addCampaign(this.AddCampaignFormOne.value,this.step)
}
}
