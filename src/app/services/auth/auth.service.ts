import {Injectable} from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {MyUser} from '../../common/MyUser';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<MyUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<MyUser>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }
}
