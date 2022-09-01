import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Calender } from '../models/model';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SchedulesService } from 'src/app/core/services/settings/schedules/schedules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10),
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null
      ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}`
      : null;
  }
}
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  constructor(
    private schedulesService: SchedulesService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    if (editData) {
      this.selectTimezone=false;
    this.timezone = editData.timezone
      this.getSchedule();
      this.heading = 'Edit Your Schedule';
      this.btn = 'Update';
    }
  }
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  selectTimezone= true;
  timezone: any;
  heading = 'Add New Schedule';
  btn = 'Save';
  calender: Calender = {
    name: '',
    timezone: '',
    id: null,
    schedules: [
      {
        day: 'monday',
        active: true,
        times: [{ from: '00:00', to: '23:59' }],
      },
      { day: 'tuesday', active: true, times: [{ from: '00:00', to: '23:59' }] },
      {
        day: 'wednesday',
        active: true,
        times: [{ from: '00:00', to: '23:59' }],
      },
      {
        day: 'thursday',
        active: true,
        times: [{ from: '00:00', to: '23:59' }],
      },
      {
        day: 'friday',
        active: true,
        times: [{ from: '00:00', to: '23:59' }],
      },
      { day: 'saturday', active: false, times: [{ from: '', to: '' }] },
      { day: 'sunday', active: false, times: [{ from: '', to: '' }] },
    ],
  };

  ngOnInit(): void {}
  addNewSchedule() {
    if (this.editData) {
      this.updateSchedule();
    } else {
      for (let i = 0; i < this.calender.schedules.length; i++) {
        if (this.calender.schedules[i].active == false) {
          this.calender.schedules[i].times[0].from = '';
          this.calender.schedules[i].times[0].to = '';
        }
      }
      this.calender.timezone = this.timezone.nameValue;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
      this.schedulesService
        .addNewSchedule(this.user.id, this.userAccount.id, this.calender)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Schedule Added Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (err) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Schedule Add Failed!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
    }
  }
  getSchedule() {
    console.log(this.editData);
    this.calender.name = this.editData.name;
    //this.timezone = this.editData.name;
    this.calender.timezone = this.editData.timezone;
    this.calender.id = this.editData.id;
    this.calender.schedules = this.editData.schedules;
  }
  updateSchedule() {
    for (let i = 0; i < this.calender.schedules.length; i++) {
      if (this.calender.schedules[i].active == false) {
        this.calender.schedules[i].times[0].from = '';
        this.calender.schedules[i].times[0].to = '';
      }
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.calender.timezone = this.timezone.nameValue;
    this.schedulesService
      .updateSchedule(this.user.id, this.userAccount.id, this.calender)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Schedule Updated Successfully',
            showConfirmButton: false,
            timer: 1000,
          });
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Schedule Update Failed!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
  }
}
