// -- MAIN IMPORT  --
import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// -- APP  --
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// -- MODULES  --
// router component
import { AppRoutingModule } from './app-routing.module';

// material import
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
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


// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';


// other module
import { FlexLayoutModule } from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';


// -- COMPONENT --
// utils
//   navbar
import { NavbarComponent } from './components/utils/navbar/navbar.component';

//   dashboard
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';

import {ExerciseService} from './services/exercise/exercise.service';

//   profile
import { ProfileMainComponent } from './components/profile/profile-main/profile-main.component';

//   client
import { ClientDetailComponent } from './components/client/client-detail/client-detail.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';

//   chat
import { ChatMainComponent } from './components/chat/chat-main/chat-main.component';



// breacrumb
import {Ng7DynamicBreadcrumbModule} from 'ng7-dynamic-breadcrumb';



// services

import { HttpClientModule } from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ExerciseModule} from './components/exercise/exercise.module';
import {WorkoutModule} from './components/workout/workout.module';
import {WorkoutService} from './services/workout/workout.service';
import {MealModule} from './components/meal/meal.module';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginComponent } from './components/auth/login/login.component';


// authentication

@NgModule({
  declarations: [
    // default
    AppComponent,
    // navbar
    NavbarComponent,

    // dashboard
    DashboardMainComponent,


    // client
    ClientDetailComponent,
    ClientListComponent,

    // chat
    ChatMainComponent,

    // profile
    ProfileMainComponent,

    LoginComponent,



  ],
  imports: [
    // router
    AppRoutingModule,
    // default
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
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


    // other import
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    // breadcrumb
    Ng7DynamicBreadcrumbModule,

    // services


    // firebase
    AngularFireModule.initializeApp(environment.firebase, 'myfitnessapp'),
    AngularFireDatabaseModule, // for database
    AngularFireStorageModule, // for storage

    // component module
    ExerciseModule,
    WorkoutModule,
    MealModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebase,
      () => 'fityou',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/dashboard', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true, // default: true
      }),



  ],
  bootstrap: [AppComponent],
  providers: [
    ExerciseService,
    WorkoutService,
  ],
})


export class AppModule { }
