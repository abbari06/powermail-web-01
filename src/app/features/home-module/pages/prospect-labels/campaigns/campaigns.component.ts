import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface User {
  status: string;
  title: string;
  email: string;
  progress: string;
  stats: string;
  createdat: string;
  
}
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ableRow: any;
  closeResult: string = '';
  public records: any[] = [];
  //define columns inside the variable displayedColumns
  displayedColumns: string[] = [
    'status',
    'title',
    'email',
    'progress',
    'stats',
    'createdat',
  ];
  //initialise the dataSource with arr of values defined in Var Data
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5,10, 20, 30, 50];

  campaigns=[];
  user={
    id:undefined
  }
  userAccount={
    id:undefined
  }
  page=0;
  limit=50;
  orderBy="-modifiedAt"
  constructor( @Inject(MAT_DIALOG_DATA) public editData: any,
  private dialogRef: MatDialogRef<CampaignsComponent>,private outreachService:OutreachService) { }
  label=[];
  ngOnInit(): void {
    this.label.push(this.editData)
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    console.log(this.editData);
    this.getCampaignsByLabel();
  }
  getCampaignsByLabel(){
    this.outreachService.getCampaignsByLabels(this.user.id,this.userAccount.id,this.currentPage,this.pageSize,this.orderBy,this.label).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource.data = res.content;
        console.log(this.dataSource);
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.totalElements;
        });
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
    this.getCampaignsByLabel();
    
  }
  }


