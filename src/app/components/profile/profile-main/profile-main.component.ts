import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Observable, Subject} from 'rxjs';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {MyUser} from '../../../common/MyUser';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['../profile.component.css']
})
export class ProfileMainComponent implements OnInit, OnDestroy {

  user: MyUser = new MyUser();

  // Private
  private unsubscribeAll: Subject<any>;

  constructor(public authServices: AuthService) {

    // Set the private defaults
    this.unsubscribeAll = new Subject();

  }


  ngOnInit(): void {

    this.authServices.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe( data => {
      this.user = data;
    });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
