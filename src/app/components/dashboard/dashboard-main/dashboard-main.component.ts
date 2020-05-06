import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Allenamenti', cols: 1, rows: 1 },
          { title: 'Feedback', cols: 1, rows: 1 },
          { title: 'Dieta', cols: 1, rows: 1 },
          { title: 'Pagamenti', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Allenamenti', cols: 2, rows: 2 },
        { title: 'Feedback', cols: 1, rows: 2 },
        { title: 'Dieta', cols: 1, rows: 1 },
        { title: 'Pagamenti', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
