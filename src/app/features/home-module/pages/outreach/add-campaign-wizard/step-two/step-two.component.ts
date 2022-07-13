import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  constructor(
    private formBuilder: FormBuilder,
    private outreachService: OutreachService
  ) {}
  AddCampaignFormTwo = this.formBuilder.group({
    schedule: ['', [Validators.required]],
    labels: ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.fetchAllSchedules();
  }
  allSchedules = [];
  fetchAllSchedules() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.outreachService
      .listAllSchedules(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.allSchedules = res;
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
}
