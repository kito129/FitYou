import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {Exercise} from '../../../common/exercise';
import {ExerciseService} from '../../../services/exercise/exercise.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete-exercise.component.html',
  styleUrls: ['../exercise.component.css']
})
export class DialogDeleteExerciseComponent {

  /**
   * Variables
   */
  response = false;

  /**
   * Constructor
   */
  constructor(
    private exerciseService: ExerciseService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogDeleteExerciseComponent>,
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

    this.exerciseService.deleteExercise()
      .catch(reason =>
        console.log(reason)
      );
  }

  /**
   * user end action
   */
  no() {

    this.dialogRef.close();
  }
}
