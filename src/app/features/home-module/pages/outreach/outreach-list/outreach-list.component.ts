import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';
import { MatRow,  } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface User {
  status: string;
  title: string;
  email: string;
  progress: string;
  stats: string;
  createdat: string;
  
}

@Component({
  selector: 'app-outreach-list',
  templateUrl: './outreach-list.component.html',
  styleUrls: ['./outreach-list.component.scss']
})

export class OutreachListComponent implements OnInit,AfterViewInit{
  
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
    'actions',
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
  constructor(private outreachService:OutreachService,private router:Router) { }

  ngOnInit(): void {
    this.getAllCampaigns();
   }
   ngAfterViewInit(): void {
    this.getAllCampaigns();
    this.dataSource.paginator = this.paginator;
  }
 
  getAllCampaigns(){
    this.user=JSON.parse(localStorage.getItem('user'));
    this.userAccount=JSON.parse(localStorage.getItem('userprofile'));
    this.outreachService.listAllCampaigns(this.user.id,this.userAccount.id,this.currentPage,this.pageSize,this.orderBy).subscribe({
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
    this.getAllCampaigns();
    
  }
  editCampaign(prospect){
    this.router.navigate(
      ['home/outreach/editcampaign'],
      { queryParams: { id:prospect.id } }
    );
  }

}


