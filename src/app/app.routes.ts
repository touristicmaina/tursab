import { Routes } from '@angular/router';

export const routes: Routes = [

  // الصفحة الرئيسية
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
  },

  // Tickets list
  {
    path: 'tickets',
    loadComponent: () =>
      import('./views/pages/tickets/tickets.component')
        .then(m => m.TicketsComponent),
  },

  // Ticket details
  {
    path: 'tickets/:id',
    loadComponent: () =>
      import('./views/pages/tickets/tickets.component')
        .then(m => m.TicketsComponent),
  },

  // أي رابط غلط
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
