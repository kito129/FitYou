import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {map, filter, finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Workout} from '../../common/workout';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  // private varibles
  private dbPath = '/workouts';
  private selectedKey: string;
  private selectedUrl: string;

  // Observable object
  // firebase variables
  // db
  workoutsCollection: AngularFirestoreCollection<Workout>;
  workouts: Observable<Workout[]>;
  workoutDoc: AngularFirestoreDocument<Workout>;
  workout: Observable<Workout>;
  // storage



  constructor(public afs: AngularFirestore,
              private storage: AngularFireStorage) {

    // fetch collection
    this.workoutsCollection = this.afs.collection(this.dbPath);

    // subscribe to db changes
    this.workouts = this.workoutsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Workout;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );



  }


  // local getter and setter db
  getKey(): string {
    return this.selectedKey;
  }

  setKey(key: string) {
    this.selectedKey = key;
  }


  // for db
  getWorkouts() {
    return this.workouts;
  }

  getWorkout(key: string) {
    this.workoutDoc = this.afs.doc<Workout>(this.dbPath + '/' + key);
    this.setKey(key);
    return this.workout = this.workoutDoc.valueChanges();
  }

  addWorkout(item: Workout) {
    return this.workoutsCollection.add(item);
  }

  deleteWorkout() {
    this.workoutDoc = this.afs.doc(this.dbPath + '/' + this.getKey());
    // delete related video
    return this.workoutDoc.delete();
  }

  updateWorkout(item: Workout) {
    this.workoutDoc = this.afs.doc(this.dbPath + '/' + this.getKey());
    this.workoutDoc.update(item);
  }

}
