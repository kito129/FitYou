import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -- MODULE IMPORT --
import {RouterModule, Routes} from '@angular/router';
// -- APP MODULE --
import {DashboardMainComponent} from './components/dashboard/dashboard-main/dashboard-main.component';
import {ProfileMainComponent} from './components/profile/profile-main/profile-main.component';
import {ChatMainComponent} from './components/chat/chat-main/chat-main.component';
import {ClientListComponent} from './components/client/client-list/client-list.component';
import {ClientDetailComponent} from './components/client/client-detail/client-detail.component';

// -- ROUTER --

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    data: {
      title: 'mainDashboard',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: 'dashboard'
        }
      ]
    },
  },
  {
    path: 'client',
    children: [
      {
        path: '',
        component: ClientListComponent,
        data: {
          title: 'Clienti',
          breadcrumb: [
            {
              label: 'Clienti',
              url: 'client'
            }
          ]
        }
      },
      {
        path: 'detail',
        component: ClientDetailComponent,
        data: {
          title: 'Dettaglio Cliente',
          breadcrumb: [
            {
              label: 'Dettaglio Cliente',
              url: 'client/detail'
            }
          ]
        }
      },
    ]
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileMainComponent,
        data: {
          title: 'Profilo',
          breadcrumb: [
            {
              label: 'Profilo',
              url: 'profile'
            }
          ]
        }
      },
    ]
  },
  {
    path: 'chat',
    children: [
      {
        path: '',
        component: ChatMainComponent,
        data: {
          title: 'Chat',
          breadcrumb: [
            {
              label: 'Chat',
              url: 'chat'
            }
          ]
        }
      },
    ]
  },
  {
    path        : 'exercise',
    loadChildren: () => import('./components/exercise/exercise.module').then(m => m.ExerciseModule)
  },
  {
    path        : 'workout',
    loadChildren: () => import('./components/workout/workout.module').then(m => m.WorkoutModule)
  },
  {
    path        : 'meal',
    loadChildren: () => import('./components/meal/meal.module').then(m => m.MealModule)
  },
  // todo 404 page
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  // todo 404 page

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

