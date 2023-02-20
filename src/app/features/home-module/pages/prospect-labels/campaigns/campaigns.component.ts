import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {
  campaigns = [];
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  pageNumber: number = 0;
  orderBy = '-modifiedAt';
  totalRecords: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CampaignsComponent>,
    private outreachService: OutreachService
  ) {}
  label = [];
  ngOnInit(): void {
    this.label.push(this.editData);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
  }
  getCampaignsByLabel(event: LazyLoadEvent) {
    event.first == 0
      ? (this.pageNumber = 0)
      : (this.pageNumber = (event.first ?? 10) / (event.rows ?? 10));
    this.outreachService
      .getCampaignsByLabels(
        this.user.id,
        this.userAccount.id,
        this.pageNumber,
        event.rows ?? 10,
        this.orderBy,
        this.label
      )
      .subscribe({
        next: (res: any) => {
          this.totalRecords = res.totalElements;
          this.campaigns = res.content;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}
