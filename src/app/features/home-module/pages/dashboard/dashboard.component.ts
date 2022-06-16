import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersComponent } from '../choose_profile/users/users.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public dialogUser: MatDialog) { }
  ngOnInit(): void {

if(history.state.mode=='agency')
{
  this.openDialogue();
}
  }
  openDialogue(): void {
    const dialogRef = this.dialogUser.open(UsersComponent, {
      width: '80%',
      height: '80%',
      disableClose: true
    });
  }
}
