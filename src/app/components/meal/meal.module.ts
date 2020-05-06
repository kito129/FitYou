import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
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
import {FlexLayoutModule} from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


import {MealCreateComponent} from './meal-create/meal-create.component';
import {MealListComponent} from './meal-list/meal-list.component';
import {DialogDeleteMealComponent} from './dialog-delete-meal/dialog-delete-meal.component';
import {MealUpdateComponent} from './meal-udpate/meal-update.component';
import {DialogDeleteExerciseComponent} from '../exercise/dialog-delete/dialog-delete-exercise.component';


const mealRoute: Routes = [

  {
    path: '',
    component: MealListComponent,
    data: {
      title: 'Piano Nutrizionale',
      breadcrumb: [
        {
          label: 'Piano Nutrizionale',
          url: 'meal'
        }
      ]
    },
  },
  {
    path: 'create',
    component: MealCreateComponent,
    data: {
      title: 'Crea Piano Nutrizionale',
      breadcrumb: [
        {
          label: 'Piano Nutrizionale',
          url: 'meal'
        },
        {
          label: 'Crea Piano Nutrizionale',
          url: 'meal/create'
        }
      ]
    }
  },
  {
    path: 'update/:id',
    component: MealUpdateComponent,
    data: {
      title: 'Modifica Piano Nutrizionale',
      breadcrumb: [
        {
          label: 'Piano Nutrizione',
          url: 'meal'
        },
        {
          label: 'Modifica Piano Nutrizionale',
          url: 'meal/update'
        }
      ]
    }
  }
];

@NgModule({
  declarations: [


    // meal
    MealCreateComponent,
    MealListComponent,
    MealUpdateComponent,
    DialogDeleteMealComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mealRoute),

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
  entryComponents: [DialogDeleteMealComponent]
})
export class MealModule { }
