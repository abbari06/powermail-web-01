import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LazyLoadEvent } from 'primeng/api';
import { OutreachService } from 'src/app/core/services/outreach/outreach.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
 
  page = 0;
  pageNumber:number=0;
  orderBy = '-name';
  availableProspectes = 0;
  prospects=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private outreachService: OutreachService
  ) {}
  label = [];
  ngOnInit(): void {
    this.label.push(this.editData);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    // this.getContactsByLabels();
  }
  getContactsByLabels(event:LazyLoadEvent){
    event.first==0? this.pageNumber = 0: this.pageNumber=((event.first??10)/(event.rows??10));
    this.outreachService.getProspectesByLabels(
      this.user.id,
      this.userAccount.id,
      this.label,
      this.pageNumber,
      event.rows??10,
      this.orderBy
    ).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.availableProspectes= res.totalElements;
        this.prospects = res.content
      },
      error:(error:any)=>{}
    })
  }
  // getContactsByLabels() {
  //   this.outreachService
  //     .getProspectesByLabels(
  //       this.user.id,
  //       this.userAccount.id,
  //       this.label,
  //       this.currentPage,
  //       this.pageSize,
  //       this.orderBy
  //     )
  //     .subscribe({
  //       next: (res: any) => {
  //         this.dataSource.data = res.content;
  //         if (res.numberOfElements >= 0) {
  //           this.availableProspectes = res.totalElements;
  //         } else if (res.length) {
  //           this.availableProspectes = res.length;
  //         }
  //       },
  //       error: (error: any) => {
  //         alert(error);
  //         console.log(error);
  //       },
  //     });
  // }

  // pageChanged(event: PageEvent) {
  //   this.pageSize = event.pageSize;
  //   this.currentPage = event.pageIndex;
  //   this.getContactsByLabels(this.label);
  // }
}
