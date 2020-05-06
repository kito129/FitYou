import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MealService} from '../../../services/meal/meal.service';
import {Meal} from '../../../common/meal';
import {DialogDeleteMealComponent} from '../dialog-delete-meal/dialog-delete-meal.component';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['../meal.component.css']
})
export class MealListComponent implements OnInit {

  /**
   * Variables
   */
  // PREVIEW EXERCISE
  panelOpenState = false;

  @Input() meals: Meal[] = [];

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(private mealService: MealService,
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

    // get meals
    this.mealService.getMeals()
      // .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(items => {
        this.meals = items;
        this.meals.sort((a, b) => a.lastUpdate - b.lastUpdate);

      });

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Method
  // -----------------------------------------------------------------------------------------------------

  /**
   * Open dialog for delete element
   */
  openDialog(key: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.mealService.setKey(key);
    this.dialog.open(DialogDeleteMealComponent, dialogConfig);
  }

}
