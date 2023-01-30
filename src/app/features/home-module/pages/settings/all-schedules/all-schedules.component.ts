import { Component, OnInit, ViewChild } from '@angular/core';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SchedulesService } from 'src/app/core/services/settings/schedules/schedules.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  risk_plan: string;
  questionnairre: string;
  modified: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.scss'],
})
export class AllSchedulesComponent implements OnInit {
  displayedColumns: string[] = [
    'Name',
    'TimeZone',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private schedulesService: SchedulesService
  ) {}
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listAllSchedules();
  }
  addSchedule() {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: '99%',
      height: '90%',
    });
    dialogRef.afterClosed().subscribe((submit) => {
      setTimeout(() => {
        this.listAllSchedules();
      }, 2000);
      
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  listAllSchedules() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.schedulesService
      .listAllSchedules(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.dataSource.data = res;
          console.log(this.dataSource);
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  editSchedule(row) {
    console.log(row);
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: '99%',
     height: '90%',
      data: row,
    });
    dialogRef.afterClosed().subscribe((submit) => {
      setTimeout(() => {
        this.listAllSchedules();
      }, 2000);
     
    });
  }
  deleteSchedule(schedule) {
    console.log(schedule);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.schedulesService
          .deleteSchedule(this.user.id, this.userAccount.id, schedule)
          .subscribe({
            next: (res: any) => {
              console.log(res);
              
              Swal.fire({
                text: "Your Schedule Has Been Deleted",
                icon: 'success',
                showCancelButton: false,
                showConfirmButton:false,
              })
              setTimeout(() => {
                this.listAllSchedules();
                Swal.close();
               
              }, 1000);
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      }
    });
  }
}
