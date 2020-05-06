import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Workout} from '../../../common/workout';
import {Exercise} from '../../../common/exercise';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {WorkoutDetailExercise} from '../../../common/workoutDetailExercise';
import {WorkoutService} from '../../../services/workout/workout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WorkoutEditExerciseComponent} from '../workout-edit-exercise/workout-edit-exercise.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-update.component.html',
  styleUrls: ['../workout.component.css']
})
export class WorkoutUpdateComponent implements OnInit, OnDestroy{

  /**
   * Variables
   */
  // SELECTOR
  exerciseKeySelected = '';
  addExerciseDisabled = true;
  updateWorkoutDisable = true;
  exerciseOrderCounter = 0;
  index = 0;

  // Data for this page
  workout: Workout = {
    name: '',
    description: '',
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    exerciseList: []
  };

  workoutDetailExercise: WorkoutDetailExercise = {
    exerciseKey: '',
    order: this.exerciseOrderCounter,
    reps: 0,
    series: 0,
    weight: 0,
    pauseTime: 0
  };

  @Input() exercises: Exercise[] = [];
  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(private exerciseService: ExerciseService,
              private workoutService: WorkoutService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private bottomSheet: MatBottomSheet,
              private router: Router) {

    // SELECTOR EXERCISE
    this.exerciseKeySelected = '';

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
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(items => {

        this.exercises = items;
      });

    // params get from router snapshot
    this.route.paramMap.subscribe(() => {

      const theWorkoutKey: string = this.route.snapshot.paramMap.get('id');
      // call API and get exercise detail info
      this.workoutService.getWorkout(theWorkoutKey)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(item => {

          this.workout = item;
          // get current index for new exercise
          this.exerciseOrderCounter = this.workout.exerciseList.length;
          this.workoutDetailExercise.order = this.exerciseOrderCounter;
        });
    });
  }

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
   * update click event
   */
  updateWorkout() {

    // replace description and update data
    this.workout.description.replace('\\n', '\n');
    this.workout.lastUpdate = Date.now();

    this.workoutService.updateWorkout(this.workout);

    this.snackBar.open('Workout aggiornato', 'chiudi', {
      duration: 3000,
    });
    this.router.navigateByUrl('/workout');
  }

  /**
   * add exercise to list
   */
  addExercise(){

    // update key and order
    this.workoutDetailExercise.exerciseKey = this.exerciseKeySelected;
    this.exerciseOrderCounter++;
    this.workoutDetailExercise.order = this.exerciseOrderCounter;
    // add exercise to list
    this.workout.exerciseList.push(this.workoutDetailExercise);
    // reset local variables
    this.workoutDetailExercise =
      {
        exerciseKey: '',
        reps: 0,
        series: 0,
        weight: 0,
        pauseTime: 0,
      };
    this.exerciseKeySelected = '';
    this.addExerciseDisabled = true;
    // check for enable update button
    this.updateWorkoutDisable = !(this.workout.exerciseList.length > 0
      && this.workout.name !== ''
      && this.workout.description !== '');
    // pop up
    this.addExerciseClick();
  }

  /**
   * check for add exercise
   */
  onValueChange() {

    this.addExerciseDisabled = !(this.workoutDetailExercise.series > 0
      && this.workoutDetailExercise.reps > 0
      && this.workoutDetailExercise.pauseTime > 0
      && this.exerciseKeySelected !== '');
  }

  /**
   * return name of exercise
   */
  getExerciseNameByKey(key: string){

    for (const item of this.exercises) {
      if (item.key === key){
        return item.name;
      }
    }
  }

  /**
   * return description of exercise
   */
  getExerciseDescriptionByKey(key: string){

    for (const item of this.exercises) {
      if (item.key === key){
        return item.description;
      }
    }
  }

  /**
   * remove exercise fro list
   */
  removeExercise(key: string, order: number){

    for (const exercise of this.workout.exerciseList) {
      if (exercise.exerciseKey === key && exercise.order === order){
        this.index = this.workout.exerciseList.indexOf(exercise);
        if (this.index !== -1) {
          this.workout.exerciseList.splice(this.index, 1);
          this.exerciseOrderCounter--;
          this.deleteExerciseClick();
        }
      }
    }

    // re arrange
    for (let i = this.index; i < this.workout.exerciseList.length; i++){

      let actualIndex = this.workout.exerciseList[i].order;
      actualIndex--;
      this.workout.exerciseList[i].order = actualIndex;
    }

    // check for create work out
    this.updateWorkoutDisable = !(this.workout.exerciseList.length > 0
      && this.workout.name !== ''
      && this.workout.description !== '');
  }

  /**
   * modify exercise setting
   */
  openBottomSheet(exerciseDetail: WorkoutDetailExercise): void {

    this.bottomSheet.open(WorkoutEditExerciseComponent, {
      data: { detail: exerciseDetail },
    });
  }

  /**
   * pop up for exercise added
   */
  addExerciseClick(){

    this.snackBar.open('Esercizio Aggiunto', 'chiudi', {
      duration: 3000,
    });
  }

  /**
   * pop up for exercise removed
   */
  deleteExerciseClick(){

    this.snackBar.open('Esercizio Rimosso', 'chiudi', {
      duration: 3000,
    });
  }

}



