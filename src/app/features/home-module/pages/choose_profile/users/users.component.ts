import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUsersComponent } from '../add-users/add-users.component';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  gridColumn = 2;
  users: [];
  closeResult = '';
  email: string;
  name: string;
  company: string;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.showUsers();
  }
  openDialogue(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '400px',
      height: '400px',
    });
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
    this.dialog.closeAll();
  }
  showUsers() {
    this.users = this.authService.userModel.useraccounts;
  }
  deleteProfile() {}
  //totalAccounts: any;
  saveUserAccount(currentUser) {
    const currentId = currentUser.id;
    this.totalaccounts = this.authService.userModel.useraccounts;
    for (let i = 0; i <= this.totalaccounts.length; i++) {
      if (currentId == this.totalaccounts[i].id) {
        localStorage.setItem(
          'user',
          JSON.stringify(this.authService.userModel)
        );
        localStorage.setItem(
          'userprofile',
          JSON.stringify(this.totalaccounts[i])
        );
      }
    }
  }
  totalaccounts = [];
}
