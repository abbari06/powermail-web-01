import { Component, OnInit, ChangeDetectorRef, OnDestroy, Renderer2,
  ViewEncapsulation,} from '@angular/core';
  import { Notifications,userNotification } from '../notification_models/notification.modal';
  import { NotificationsService } from 'src/app/core/services/notification/notifications.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner-service/spinner.service';
import {AuthService} from 'src/app/core/services/auth.service';
import { UsersComponent } from './pages/choose_profile/users/users.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NotificationsService],
 //encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  NOTIFICATIONS = 3;
  showAlertBanner: boolean;
  showNotifications: boolean;
  bannerType: number;
  // account: Account[] = [];
  userNotification: userNotification;
  notification: Notifications[] = [];
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public spinnerService: SpinnerService,
    private authService:AuthService,
    public dialogUser: MatDialog,
    private notificationsService: NotificationsService,
    private renderer2: Renderer2,
    private db: AngularFireDatabase
  ) {
    this.db.database.goOnline();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.db.database.goOffline();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  firstName='';
  lastName='';
user:any=undefined;
profile=false;
  ngOnInit(): void {
    console.log("home")
    this.user=JSON.parse(localStorage.getItem('user'));
    if(this.user==undefined){
      this.firstName=this.authService.userModel.firstname;
      this.lastName=this.authService.userModel.lastname;
      if(this.authService.userModel.accounttype=='agency'){
        this.profile=true;
      }
      console.log(this.firstName,this.lastName); 
    }
    
    if(this.user.accounttype=='agency'){
      this.profile=true;
    }
    if(this.user!=undefined){
      this.firstName=this.user.firstname;
    this.lastName=this.user.lastname;
    }
    console.log(this.user);
    setTimeout(() => {
      const userstate = this.authService.userStateSource;
      userstate.subscribe((user) => {
        if (user) {
       this.notificationsService.fetchNotifications();
       this.notification=this.notificationsService.notificationList;
            console.log(this.notification);

        }
      });
        this.fetchUser()
    }, 2000);
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
    window.location.reload();
  }
  openDialogue(): void {
    const dialogRef = this.dialogUser.open(UsersComponent, {
      width: '80%',
      height: '80%',
      //disableClose: true,
    });
    dialogRef.afterClosed().subscribe((val) =>{
      console.log(val);
      
     if(val==='submit'){
      window.location.reload();
     }
       
      })
  }
  /**
   * Fetch user for notification handleing
   */
   fetchUser() {
    console.log('fetchuser');
    console.log(this.authService.getUserID());

    this.notificationsService
      .fetchUser(btoa(this.authService.getUserID()))
      .subscribe((user) => {
        if (user) {

    console.log(this.authService.getUserID());
          console.log("userfound ");
          this.userNotification = user;

        } else {
          console.log('adding user ');

          this.userNotification = {
            user_id: this.authService.getUserID(),
            dismissed_notifications: [],
          };
          //Add user for notification handleing
          this.notificationsService
          .addUser( btoa(this.authService.getUserID()) , this.userNotification)
            // this.userNotification
          ;
        }
        //Get Notifications
        this.getNotifications();
      });
  }

  /**
   * Get notifications list
   */
  getNotifications() {
    console.log("get noti called");

    this.notificationsService.list().subscribe(
      (notification) => {
        
        this.notification = notification;
        this.getUserNotifications();
        console.log(notification+"fgghfghfgh");
      },
      (error) => {},
      () => {}
    );
  }

  /**
   * Get User's notification which are not dismissed
   */
  getUserNotifications() {
    console.log("get user Notification called");

    if (
      this.userNotification.dismissed_notifications &&
      this.userNotification.dismissed_notifications.length > 0
    ) {
      this.userNotification.dismissed_notifications.forEach(
        (notificationId) =>
          (this.notification = this.notification.filter(
            (notification) => notification.key !== notificationId
          ))
      );
    } else {
      this.userNotification.dismissed_notifications = [];
    }

    if (this.notification.length > 0) {
      this.showNotifications = true;
      this.bannerType = this.NOTIFICATIONS;
      this.renderer2.addClass(document.body, 'alert-active');
    } else {
      this.bannerType = null;
      this.showNotifications = false;
    }

    console.log(`final notications ${this.notification}`);


  }

  /**
   * Dismiss User's Notification
   * @param notificationId
   */
  dismissNotification(notificationId: string) {
    console.log("dismissed");

    this.userNotification.dismissed_notifications.push(notificationId);
    this.notificationsService.notificationDismissed(btoa(this.authService.getUserID()), this.userNotification);
  }
  
}
