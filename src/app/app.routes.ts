import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'tickets',
    loadComponent: () =>
      import('./views/pages/tickets/tickets.component')
        .then(m => m.TicketsComponent),
  },

  {
    path: 'tickets/:id',
    loadComponent: () =>
      import('./views/pages/tickets/tickets.component')
        .then(m => m.TicketsComponent),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
  },

];
