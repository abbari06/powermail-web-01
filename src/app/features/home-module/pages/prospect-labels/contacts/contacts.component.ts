import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {OutreachService} from 'src/app/core/services/outreach/outreach.service'
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
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  //schedule = new FormControl();
  closeResult:string
  displayStyle = 'none';
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  campaign={
    id:undefined
  }
  id:any;
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
  allSchedules = [];
  allLabels:any;
  availableProspectes=0;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ContactsComponent>,private outreachService:OutreachService) { }
    label=[];
  ngOnInit(): void {
    this.label.push(this.editData)
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    console.log(this.editData);
    this.getContactsByLabels(this.editData)
  }
getContactsByLabels(label){
  
   this.outreachService.getProspectesByLabels(this.user.id,this.userAccount.id,this.label,this.currentPage,this.pageSize,this.orderBy).subscribe({
      next: (res: any) => {
        console.log("resssssss",res);
        this.dataSource.data = res.content;
        if(res.numberOfElements>=0){
        this.availableProspectes=res.totalElements
        }
        else if(res.length){
          this.availableProspectes=res.length
        }
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
    this.getContactsByLabels(this.label);
  }
}
