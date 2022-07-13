import { Component, OnInit } from '@angular/core';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  constructor(
    private outreachService: OutreachService,
    private formBuilder: FormBuilder
  ) {}
  allMailAccounts = [];
  ngOnInit(): void {
    this.fetchAllMailAccounts();
  }
  AddCampaignFormOne = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    mailAccount: [, [Validators.required]],
  });
  fetchAllMailAccounts() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
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
  next() {
    console.log(this.AddCampaignFormOne.value);
  }
}
