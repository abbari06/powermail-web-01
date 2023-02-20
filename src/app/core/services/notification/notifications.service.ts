import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database/';
import { Notifications ,userNotification} from 'src/app/features/notification_models/notification.modal';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationRef: AngularFireList<Notifications> = null;
  usersRef: AngularFireList<userNotification> = null;
  private $notifications = new BehaviorSubject<Notifications[]>([]);
  notificationList: Notifications[] = [];
  constructor(private db: AngularFireDatabase) { 
    this.usersRef = this.db.list(`users`);
  }
  /**
   *  Fetch notification
   */
   fetchNotifications() {
    this.notificationRef = this.db.list('notifications', (ref) =>
      ref.orderByChild('end_date').startAt(Date.now())
    );

    this.notificationRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((notifications) => {

        this.notificationList = notifications.filter(
          (notification) =>
            notification.is_active === true &&
            notification.start_date <= Date.now().toString()
        );
        this.notificationList = this.notificationList.sort(
          (a, b) => b.priority - a.priority
        );
        this.$notifications.next(this.notificationList);
      });

  }

  /**
   * Get observable of current notfication list
   */
  list(): Observable<Notifications[]> {
    return this.$notifications.asObservable();
  }

  /**
   * Fetch user for notification handleing
   * @param userId
   */
  fetchUser(userId: string): Observable<any> {
    return this.db.object(`users/` + userId).valueChanges();
  }

  /**
   * Add user for notification Handling
   * @param key
   * @param data
   */
  addUser(key: any, data: userNotification) {

   const v = this.usersRef.set(key, data).catch((error) => console.log(error));


  }

  /**
   * Handle Dismiss notification
   * @param key
   * @param data
   */
  notificationDismissed(key: string, data: userNotification) {

    this.usersRef.update(key, data).catch((error) => console.log(error));
  }
}
