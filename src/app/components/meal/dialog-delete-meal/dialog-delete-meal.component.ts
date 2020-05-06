import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {Exercise} from '../../../common/exercise';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {WorkoutService} from '../../../services/workout/workout.service';
import {MealService} from '../../../services/meal/meal.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete-meal.component.html',
  styleUrls: ['../meal.component.css']
})
export class DialogDeleteMealComponent {

  /**
   * Variables
   */
  response = false;

  /**
   * Constructor
   */
  constructor(
    private mealService: MealService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogDeleteMealComponent>,
    @Inject(MAT_DIALOG_DATA) response) {

    this.response = response;

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Method
  // -----------------------------------------------------------------------------------------------------

  /**
   * user confirm action
   */
  yes() {

    this.dialogRef.close(this.response = true);

    this.mealService.deleteMeal()
      .catch(reason =>
        console.log(reason)
      );

  }

  /**
   * user exit action
   */
  no() {
    this.dialogRef.close();
  }
}
