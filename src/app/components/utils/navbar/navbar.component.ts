import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  /**
   * Variables
   */
  breadcrumbConfig: object = {
    bgColor: 'primary',
    fontSize: '25px',
    fontColor: 'white',
    lastLinkColor: '#000',
    symbol: ' - ',
  };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  /**
   * Constructor
   */
  constructor(private breakpointObserver: BreakpointObserver,
              public router: Router) {}


}
