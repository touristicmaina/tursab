import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: 'clients',
    loadComponent: () =>
      import('./clients/clients.component').then(m => m.ClientsComponent),
  },
  {
    path: 'tickets',
    loadComponent: () =>
      import('./tickets/tickets.component').then(m => m.TicketsComponent),
  },
  {
    path: 'activities',
    loadComponent: () =>
      import('./activities/activities.component').then(m => m.ActivitiesComponent),
  },
];
