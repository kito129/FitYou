import {Component, Input, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import {ExerciseService} from '../../../services/exercise/exercise.service';
import {Exercise} from '../../../common/exercise';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BUCKET} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['../exercise.component.css'],
  providers: [
    { provide: BUCKET, useValue: 'default' }
  ]
})
export class ExerciseCreateComponent {

  /**
   * Variables
   */
  // Data for this page
  exercise: Exercise = {
    name: '',
    description: '',
    dateCreated: Date.now(),
    lastUpdate: Date.now(),
    userUid: ''
  };

  // upload
  selectedFile = null;
  progress: number;
  progressBar = false;

  // button option
  disabledCreate = false;
  disabledUpload = true;
  uploadedVideoConfirm = false;

  /**
   * Constructor
   */
  constructor(private snackBar: MatSnackBar,
              private exerciseService: ExerciseService,
              private router: Router){}

  // -----------------------------------------------------------------------------------------------------
  // @ Public Method
  // -----------------------------------------------------------------------------------------------------

  /**
   * file is selected by user
   */
  onFileSelected(event) {

    this.selectedFile = event.target.files[0];
    this.progressBar = true;
    this.disabledUpload = false;
  }

  /**
   * upload media and save URL link
   */
  uploadClick() {

    this.exerciseService.uploadFile(this.selectedFile);
    this.exerciseService.percentage.asObservable().subscribe(data => {
      this.progress = Math.round(data * 100);
    });
    this.exerciseService.URL.asObservable().subscribe(data => {
      if (data !== undefined) {
        this.exercise.urlLink = data;
        this.snackBar.open('Media caricato', 'close', {
          duration: 2000,
        });
        this.disabledCreate = true;
        this.disabledUpload = true;
        this.uploadedVideoConfirm = true;
      }
    });
  }

  /**
   * create exercise
   */
  createClick(){

    this.exercise.description.replace('\n', '<br>');
    console.log(this.exerciseService.addExercise(this.exercise));
    this.snackBar.open('Esercizio Creato', 'chiudi', {
      duration: 3000,
    });
    this.router.navigateByUrl('/exercise');
  }
}
