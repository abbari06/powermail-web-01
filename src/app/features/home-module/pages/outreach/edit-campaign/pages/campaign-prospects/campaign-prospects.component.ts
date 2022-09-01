import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
export interface User {
  fName: string;
  lName: string;
  place: number;
  company: string;
  position: string;
  email: string;
  labels: string;
}
@Component({
  selector: 'app-campaign-prospects',
  templateUrl: './campaign-prospects.component.html',
  styleUrls: ['./campaign-prospects.component.scss']
})
export class CampaignProspectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  //schedule = new FormControl();
  closeResult:string
  displayStyle = 'none';
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'email',
    'company',
    'position',
    'labels',
  ];
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5,10, 20, 30, 50];
  limit = 10;
  page = 0;
  orderBy = '-name';
  availableProspects:number;
  campaign={
    id:undefined
  }
  user={
    id:undefined
  }
  userAccount={
    id:undefined
  }
  labels=[];
  constructor(private route:ActivatedRoute,private outreachService:OutreachService) { }

  ngOnInit(): void {
    this.campaign.id= this.route.snapshot.queryParamMap.get('id');
    console.log(this.campaign.id)
    this.listCampaignsById();
   
  }

listCampaignsById(){
  this.user=JSON.parse(localStorage.getItem('user'));
  this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
    this.outreachService.getCampaignsById(this.user.id,this.userAccount.id,this.campaign).subscribe({
      next: (res: any) => {
        console.log(res);
        this.labels=res.labels;
        console.log(this.labels)
        this.getProspectsByLabels();
      },
      error: (error: any) => {
        alert(error);
        console.log(error);
      },
    });
}
getProspectsByLabels(){
  this.outreachService.getProspectesByLabels(this.user.id,this.userAccount.id,this.labels,this.currentPage,this.pageSize,this.orderBy).subscribe({
    next: (res: any) => {
      console.log("resssssss",res);
      this.dataSource.data = res.content;
      this.availableProspects=res.totalElements;
    },
    error: (error: any) => {
      alert(error);
      console.log(error);
    },
  });
}
pageChanged(event: PageEvent) {
  console.log({ event });
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  this.getProspectsByLabels();
}
}
