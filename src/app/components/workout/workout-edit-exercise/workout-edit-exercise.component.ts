import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-workout-edit-exercise',
  templateUrl: './workout-edit-exercise.component.html',
  styleUrls: ['../workout.component.css']
})
export class WorkoutEditExerciseComponent  {

  /**
   * Constructor
   */
  constructor(private bottomSheetRef: MatBottomSheetRef<WorkoutEditExerciseComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public Method
  // -----------------------------------------------------------------------------------------------------

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    // CREATE EVENT

    this.snackBar.open('Esercizio Modificato', 'chiudi', {
      duration: 3000,
    });

    event.preventDefault();
  }

}
