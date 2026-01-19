import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Layout
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

// Pages (Lazy Loaded – Standalone)
export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      },
      {
        path: 'activities',
        loadComponent: () =>
          import('./views/pages/activities/activities/activities.component')
            .then(m => m.ActivitiesComponent),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./views/pages/clients/clients-list/clients-list.component')
            .then(m => m.ClientsListComponent),
      },
      {
        path: 'add-client',
        loadComponent: () =>
          import('./views/pages/add-client/add-client.component')
            .then(m => m.AddClientComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./views/pages/services/services.component')
            .then(m => m.ServicesComponent),
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./views/pages/tickets/tickets.component')
            .then(m => m.TicketsComponent),
      },
      {
        path: 'add-ticket',
        loadComponent: () =>
          import('./views/pages/add-ticket/add-ticket.component')
            .then(m => m.AddTicketComponent),
      },
    ],
  },
];
