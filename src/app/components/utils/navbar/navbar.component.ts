import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {map, shareReplay, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {MyUser} from '../../../common/MyUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

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

  // Private
  private unsubscribeAll: Subject<any>;

  user: MyUser = new MyUser();

  /**
   * Constructor
   */
  constructor(private breakpointObserver: BreakpointObserver,
              public router: Router,
              public authServices: AuthService) {

    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  exit(){
    this.router.navigateByUrl('/login');
  }




  ngOnInit(): void {

    this.authServices.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe( data => {
        this.user = data;
      });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
