import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {WorkoutListComponent} from './workout-list/workout-list.component';
import {WorkoutCreateComponent} from './workout-create/workout-create.component';
import {WorkoutAssignComponent} from './workout-assign/workout-assign.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DialogDeleteExerciseComponent} from '../exercise/dialog-delete/dialog-delete-exercise.component';
import {DialogDeleteWorkoutComponent} from './dialog-delete-workout/dialog-delete-workout.component';
import {WorkoutUpdateComponent} from './workout-update/workout-update.component';
import { WorkoutEditExerciseComponent } from './workout-edit-exercise/workout-edit-exercise.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


const workoutRoute: Routes = [

    {
      path: '',
      component: WorkoutListComponent,
      data: {
        title: 'Workout Library',
        breadcrumb: [
          {
            label: 'Workout',
            url: 'workout'
          }
        ]
      },
    },
    {
      path: 'create',
      component: WorkoutCreateComponent,
      data: {
        title: 'Crea Workout',
        breadcrumb: [
          {
            label: 'Workout',
            url: 'workout'
          },
          {
            label: 'Crea Workout',
            url: 'workout/create'
          }
        ]
      }
    },
    {
      path: 'assign',
      component: WorkoutAssignComponent,
      data: {
        title: 'Assegna Workout',
        breadcrumb: [
          {
            label: 'Workout',
            url: 'workout'
          },
          {
            label: 'Assegna Allenamento',
            url: 'workout/assign'
          }
        ]
      }
    },
    {
      path: 'update/:id',
      component: WorkoutUpdateComponent,
      data: {
        title: 'Modifica Workout',
        breadcrumb: [
          {
            label: 'Workout',
            url: 'workout'
          },
          {
            label: 'Modifica Allenamento',
            url: 'workout/update'
          }
        ]
      }
    }
  ];



@NgModule({
  declarations: [
    // exercise
    WorkoutListComponent,
    WorkoutCreateComponent,
    WorkoutAssignComponent,
    WorkoutUpdateComponent,
    DialogDeleteWorkoutComponent,
    WorkoutEditExerciseComponent


  ],

  imports: [

    CommonModule,
    RouterModule.forChild(workoutRoute),

    ReactiveFormsModule,
    FormsModule,


    // material module
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatBadgeModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    DragDropModule,
    MatDialogModule,
    MatBottomSheetModule



  ],
  entryComponents: [DialogDeleteWorkoutComponent]
})
export class WorkoutModule { }
