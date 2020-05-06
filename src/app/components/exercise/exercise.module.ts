import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExerciseUpdateComponent} from './exercise-update/exercise-update.component';
import {ExerciseCreateComponent} from './exercise-create/exercise-create.component';
import {ExerciseListComponent} from './exercise-list/exercise-list.component';
import {RouterModule, Routes} from '@angular/router';
import {DialogDeleteExerciseComponent} from './dialog-delete/dialog-delete-exercise.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {AppRoutingModule} from '../../app-routing.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {AppComponent} from '../../app.component';

const exercisesRoute: Routes = [
  {
      path: '',
      component: ExerciseListComponent,
      data: {
        title: 'Esercizi',
        breadcrumb: [
          {
            label: 'Esercizi',
            url: 'exercise'
          }
        ]
      }
    },
    {
      path: 'create',
      component: ExerciseCreateComponent,
      data: {
        title: 'Crea Esercizio',
        breadcrumb: [
          {
            label: 'Esercizi',
            url: 'exercise'
          },
          {
            label: 'Crea Esercizio',
            url: 'exercise/create'
          }
        ]
      }
    },
    {
      path: 'update/:id',
      component: ExerciseUpdateComponent,
      data: {
        title: 'Modifica Esercizio',
        breadcrumb: [
          {
            label: 'Esercizi',
            url: 'exercise'
          },
          {
            label: 'Modifica Esercizio',
            url: 'exercise/update'
          }
        ]
      }
    },
];

@NgModule({
  declarations: [
    // exercise
    ExerciseUpdateComponent,
    ExerciseCreateComponent,
    ExerciseListComponent,
    DialogDeleteExerciseComponent,

  ],

  imports: [

    CommonModule,
    RouterModule.forChild(exercisesRoute),

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

  ],
  entryComponents: [DialogDeleteExerciseComponent]
})
export class ExerciseModule { }
