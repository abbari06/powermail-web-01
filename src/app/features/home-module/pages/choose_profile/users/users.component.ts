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
    private authService: AuthService,
    private dialogRef: MatDialogRef<UsersComponent>
  ) {}

  ngOnInit(): void {
    this.showUsers();
  }
  openDialogue(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '400px',
      
    });
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.showUsers();
      }
      })
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
    this.dialog.closeAll();
  }
  user:any=undefined;
  showUsers() {
    this.authService.getUserAccounts().subscribe({
      next: (res: any) => {
       this.users=res;
      }
    })

  }
  deleteProfile() {}
  //totalAccounts: any;
  saveUserAccount(currentUser) {
    this.dialogRef.close('submit');
    this.user=JSON.parse(localStorage.getItem('user'));
    const currentId = currentUser.id;
    this.totalaccounts = this.users;
    for (let i = 0; i <= this.totalaccounts.length; i++) {
      if (currentId == this.totalaccounts[i].id) {
        if(this.user==undefined){
          this.user=this.authService.userModel;
          localStorage.setItem(
            'user',
            JSON.stringify(this.user)
          );
        }
        localStorage.setItem(
          'userprofile',
          JSON.stringify(this.totalaccounts[i])
        );
      }
    }
    
  }
  totalaccounts = [];
  onNoClick(){
    
  }
}
