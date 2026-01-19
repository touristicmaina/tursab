import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },

      {
        path: 'clients',
        loadComponent: () =>
          import('./views/pages/clients/clients.component')
            .then(m => m.ClientsComponent),
      },

      {
        path: 'tickets',
        loadComponent: () =>
          import('./views/pages/tickets/tickets.component')
            .then(m => m.TicketsComponent),
      },

      {
        path: 'activities',
        loadComponent: () =>
          import('./views/pages/activities/activities.component')
            .then(m => m.ActivitiesComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
