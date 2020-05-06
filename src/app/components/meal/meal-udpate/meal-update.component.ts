import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Meal} from '../../../common/meal';
import {MealService} from '../../../services/meal/meal.service';


@Component({
  selector: 'app-meal-udate',
  templateUrl: './meal-update.component.html',
  styleUrls: ['../meal.component.css']
})
export class MealUpdateComponent implements OnInit, OnDestroy {

  /**
   * Variables
   */
    // Data for this page
  meal: Meal = new Meal();

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(private mealService: MealService,
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

      const theMealKey: string = this.route.snapshot.paramMap.get('id');
      // call API and get exercise detail info
      this.mealService.getMeal(theMealKey)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(item => {
          this.meal = item;
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
   * update exercise in DB
   */
  updateClick() {

    this.meal.description.replace('\\n', '\n');
    this.meal.lastUpdate = Date.now();

    this.mealService.updateMeal(this.meal);

    this.snackBar.open('Piano Nutrizionale aggiornato', 'chiudi', {
      duration: 3000,
    });
    this.router.navigateByUrl('/meal');
  }

}
