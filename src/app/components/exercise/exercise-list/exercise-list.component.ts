import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';

import {ExerciseService} from '../../../services/exercise/exercise.service';
import {Exercise} from '../../../common/exercise';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogDeleteExerciseComponent} from '../dialog-delete/dialog-delete-exercise.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['../exercise.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {

  /**
   * Variables
   */
  @Input() exercises: Exercise[] = [];
  // Private
  private unsubscribeAll: Subject<any>;

  // description panel
  description: any[] = [];
  icon: any[] = [];

  /**
   * Constructor
   */
  constructor(private exerciseService: ExerciseService,
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
  ngOnInit() {


    this.exerciseService.getExercises()
      // .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(items => {
        this.exercises = items;

        // create array for description button
        for (const exe of this.exercises) {

            const desc: string[] = [];
            const icon: string[] = [];
            // check description
            desc.push(exe.key);
            desc.push('truncate-text');
            // check icon
            icon.push(exe.key);
            icon.push('keyboard_arrow_down');

           // check for arrow
            const re =  /\r|\n/.exec(exe.description);
            if (re || exe.description.length > 30){
              desc.push('true');
            } else {
              desc.push('false');
            }

            this.description.push(desc);
            this.icon.push(icon);
        }
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
   * Open dialog for delete element
   */
  openDialog(key: string, url: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.exerciseService.setKey(key);
    this.exerciseService.setURL(url);
    this.dialog.open(DialogDeleteExerciseComponent, dialogConfig);
  }

  /**
   * return correct description class for each exercise
   */
  getDescriptionById(key: string): string{
    for (const el of this.description) {
      if (el[0] === key){
        return el[1];
      }
    }
  }

  /**
   * return correct icon class for each exercise
   */
  getIconById(key: string): string{
    for (const el of this.icon) {
      if (el[0] === key){
        return el[1];
      }
    }
  }

  /**
   * return if visualize expand arrow
   */
  getNewLineById(key: string): string{
    for (const el of this.description) {
      if (el[0] === key){
        return el[2];
      }
    }
  }

  /**
   * on expand button click
   */
  changeDescription(key: string){

    // change description
    for (const el of this.description) {
      if (el[0] === key){
        if (el[1] === 'truncate-text'){
            el[1] = 'expanded-text';
        } else {
          el[1] = 'truncate-text';
        }
      }
    }
    // change icon
    for (const el of this.icon) {
      if (el[0] === key){
        if (el[1] === 'keyboard_arrow_down'){
          el[1] = 'keyboard_arrow_up';
        } else {
          el[1] = 'keyboard_arrow_down';
        }
      }
    }

  }

}
