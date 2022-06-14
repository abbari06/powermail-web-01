import { Component, OnInit } from '@angular/core';
import { AddUserProfileComponent } from '../add-user-profile/add-user-profile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-all-user-profiles',
  templateUrl: './all-user-profiles.component.html',
  styleUrls: ['./all-user-profiles.component.scss']
})

export class AllUserProfilesComponent implements OnInit {
  email: string;
  name: string;
  company: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogue(): void {
    const dialogRef = this.dialog.open(AddUserProfileComponent, {
      width: '400px',
      height: '400px',

    });

  
  }

}
