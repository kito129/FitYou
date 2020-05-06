import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {map, filter, finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Workout} from '../../common/workout';
import {Meal} from '../../common/meal';


@Injectable({
  providedIn: 'root'
})
export class MealService {

  // private varibles
  private dbPath = '/meals';
  private selectedKey: string;
  private selectedUrl: string;

  // Observable object
  // firebase variables
  // db
  mealsCollection: AngularFirestoreCollection<Meal>;
  meals: Observable<Meal[]>;
  mealDoc: AngularFirestoreDocument<Meal>;
  meal: Observable<Meal>;
  // storage

  constructor(public afs: AngularFirestore) {

    // fetch collection
    this.mealsCollection = this.afs.collection(this.dbPath);

    // subscribe to db changes
    this.meals = this.mealsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Meal;
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
  getMeals() {
    return this.meals;
  }

  getMeal(key: string) {
    this.mealDoc = this.afs.doc<Meal>(this.dbPath + '/' + key);
    this.setKey(key);
    return this.meal = this.mealDoc.valueChanges();
  }

  addMeal(item: Meal) {
    return this.mealsCollection.add(item);
  }

  deleteMeal() {
    this.mealDoc = this.afs.doc(this.dbPath + '/' + this.getKey());
    // delete related video
    return this.mealDoc.delete();
  }

  updateMeal(item: Meal) {
    this.mealDoc = this.afs.doc(this.dbPath + '/' + this.getKey());
    this.mealDoc.update(item);
  }

}
