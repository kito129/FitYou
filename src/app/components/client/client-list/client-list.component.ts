import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


export interface UserData {
  id: string;
  name: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const PACK: string[] = [
  'Pack 1', 'Pack 2', 'Pack 3'
];

const DATE: string[] = [
  '12/02/2020', '18/03/2020', '1/02/2020', '1/04/2020'
];

const NUMBER: string[] = [
  '3', '4', '2', '5'
];


const MEAL: string[] = [
  'yes', 'no'
];

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['../client.component.css']
})
export class ClientListComponent implements OnInit {

  constructor() {
    // Create 100 users
    const users = Array.from({length: 7}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  displayedColumns: string[] = ['id', 'name', 'date', 'pack', 'workout', 'meal' ,  'setting'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): { date: string; meal: string; workout: string; name: string; id: string; pack: string } {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const pack = PACK[Math.round(Math.random() * (PACK.length - 1))];
  const date = DATE[Math.round(Math.random() * (DATE.length - 1))];
  const workout = NUMBER[Math.round(Math.random() * (NUMBER.length - 1))];
  const meal = MEAL[Math.round(Math.random() * (MEAL.length - 1))];

  return {
    id: id.toString(),
    name,
    pack,
    date,
    workout,
    meal
  };
}
