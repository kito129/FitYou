import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {Exercise} from '../../../common/exercise';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {WorkoutService} from '../../../services/workout/workout.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete-workout.component.html',
  styleUrls: ['../workout.component.css']
})
export class DialogDeleteWorkoutComponent implements OnInit {

  response = false;


  constructor(
    private workoutService: WorkoutService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogDeleteWorkoutComponent>,
    @Inject(MAT_DIALOG_DATA) response) {

    this.response = response;

  }

  ngOnInit() {

  }

  yes() {

    this.dialogRef.close(this.response = true);

    this.workoutService.deleteWorkout()
      .catch(reason =>
        console.log(reason)
      );


  }

  no() {
    this.dialogRef.close();
  }
}
