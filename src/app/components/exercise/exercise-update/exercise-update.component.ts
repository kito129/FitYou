import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {Exercise} from '../../../common/exercise';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {WorkoutEditExerciseComponent} from '../../workout/workout-edit-exercise/workout-edit-exercise.component';

@Component({
  selector: 'app-exercise-modify',
  templateUrl: './exercise-update.component.html',
  styleUrls: ['../exercise.component.css']
})
export class ExerciseUpdateComponent implements OnInit, OnDestroy {

  /**
   * Variables
   */
  // Data for this page
  exercise: Exercise = new Exercise();

  // Private
  private unsubscribeAll: Subject<any>;

  // upload
  selectedFile = null;
  progress: number;
  currentUrl: any;
  // file params
  fileModify = false;
  editVideo = false;
  progressBar = false;
  uploadedVideoConfirm = false;
  // button disable control
  disabledUpdate = false;
  disableUploadedVideo = true;

  /**
   * Constructor
   */
  constructor(private exerciseService: ExerciseService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) {

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

     // params get from router snapshot
     this.route.paramMap.subscribe(() => {

      const theExerciseKey: string = this.route.snapshot.paramMap.get('id');
      // call API and get exercise detail info
      this.exerciseService.getExercise(theExerciseKey)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(item => {
        this.exercise = item;
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
   * create progress bar and set target on file select
   */
  onFileSelected(event) {

    this.selectedFile = event.target.files[0];
    this.progressBar = true;
    this.disableUploadedVideo = false;
  }

  /**
   * upload file to DB
   */
  uploadClick() {

    this.currentUrl = this.exercise.urlLink;
    this.exerciseService.uploadFile(this.selectedFile);
    this.exerciseService.percentage.asObservable().subscribe(data => {

      this.progress = Math.round(data * 100);
    });
    this.exerciseService.URL.asObservable().subscribe(data => {

      if (data !== undefined) {

        this.exercise.urlLink = data;
        this.snackBar.open('Media caricato', 'chiudi', {
          duration: 2000,
        });
        this.disabledUpdate = true;
        this.fileModify = true;
        this.disableUploadedVideo = true;
        this.uploadedVideoConfirm = true;
      }
    });
  }

  /**
   * update exercise in DB
   */
  updateClick() {

    if (this.currentUrl !== this.exercise.urlLink && this.fileModify){

      this.exerciseService.deleteFile(this.currentUrl);
      this.currentUrl = '';
      this.fileModify = false;
    }
    // fix params
    this.exercise.description.replace('\\n', '\n');
    this.exercise.lastUpdate = Date.now();
    // call service
    this.exerciseService.updateExercises(this.exercise);
    // confirm action
    this.snackBar.open('Esercizio aggiornato', 'chiudi', {
      duration: 3000,
    });
    this.router.navigateByUrl('/exercise');
  }

  /**
   * visualize edit video option
   */
  changeStateVideo(){

    if (this.editVideo){

      this.editVideo = false;
      this.disabledUpdate = false;
    } else {

      this.editVideo = true;
      this.disabledUpdate = true;
    }
  }
}
