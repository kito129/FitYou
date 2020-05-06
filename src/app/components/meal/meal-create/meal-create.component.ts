import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Workout} from '../../../common/workout';
import {WorkoutDetailExercise} from '../../../common/workoutDetailExercise';
import {Exercise} from '../../../common/exercise';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {WorkoutService} from '../../../services/workout/workout.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {WorkoutEditExerciseComponent} from '../../workout/workout-edit-exercise/workout-edit-exercise.component';
import {Meal} from '../../../common/meal';
import {MealService} from '../../../services/meal/meal.service';


// CHIPS EXPORT
export interface Type {
  name: string;
}

@Component({
  selector: 'app-meal-udate',
  templateUrl: './meal-create.component.html',
  styleUrls: ['../meal.component.css']
})
export class MealCreateComponent implements OnDestroy {

  /**
   * Variables
   */
    // SELECTOR
  mealKeySelected = '';

  // Data for this page
  meal: Meal = {
    name: '',
    description: '',
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    clientKey: ''
  };

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(private mealService: MealService,
              private snackBar: MatSnackBar,
              private router: Router
  ) {

    // SELECTOR EXERCISE
    this.mealKeySelected = '';

    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Method
  // -----------------------------------------------------------------------------------------------------

  /**
   * add workout to db
   */
  addMeal(){

    this.meal.clientKey = this.mealKeySelected;
    this.mealService.addMeal(this.meal);
    this.createMealClick();

  }

  /**
   * pop up for workout created
   */
  createMealClick(){

    this.snackBar.open('Piano Nutrionale Creato', 'chiudi', {
      duration: 3000,
    });
    this.router.navigateByUrl('/meal');
  }

}
