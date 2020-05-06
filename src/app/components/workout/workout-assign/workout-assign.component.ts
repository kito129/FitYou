import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-assign',
  templateUrl: './workout-assign.component.html',
  styleUrls: ['../workout.component.css']
})
export class WorkoutAssignComponent implements OnInit {

  // SELECTOR
  sel: string;
  sel2: string;

  constructor() { }

  ngOnInit(): void {

    // SELECTOR
    this.sel = ' - ';
    this.sel2 = ' - ';
  }

}
