import {Component, Input, OnInit} from '@angular/core';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {WorkoutService} from '../../../services/workout/workout.service';
import {Subject} from 'rxjs';
import {Workout} from '../../../common/workout';
import {Exercise} from '../../../common/exercise';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogDeleteWorkoutComponent} from '../dialog-delete-workout/dialog-delete-workout.component';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['../workout.component.css'],
})
export class WorkoutListComponent implements OnInit {

  /**
   * Variables
   */
  // PREVIEW EXERCISE
  panelOpenState = false;

  @Input() workouts: Workout[] = [];
  @Input() exercises: Exercise[];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(private exerciseService: ExerciseService,
              private workoutService: WorkoutService,
              private dialog: MatDialog) {

    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    // get all exercise list
    this.exerciseService.getExercises()
      // .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(items => {
        this.exercises = items;
      });

    // get all exercise list
    this.workoutService.getWorkouts()
      // .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(workout => {
        this.workouts = workout;
      });
  }

  /**
   * return exercise name
   */
  getExerciseNameByKey(key: string){

    for (const item of this.exercises) {
      if (item.key === key){
        return item.name;
      }
    }
  }

  /**
   * return description name
   */
  getExerciseDescriptionByKey(key: string){

    for (const item of this.exercises) {
      if (item.key === key){
        return item.description;
      }
    }
  }
  /**
   * return video URL of exercise
   */
  getExerciseVideoUrlByKey(key: string){

    for (const item of this.exercises) {
      if (item.key === key){
        return item.urlLink;
      }
    }
  }

  /**
   * Open dialog for delete element
   */
  openDialog(key: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.workoutService.setKey(key);
    this.dialog.open(DialogDeleteWorkoutComponent, dialogConfig);
  }

}
