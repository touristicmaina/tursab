import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  // 🔹 الصفحة الرئيسية → لوج إن
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // 🔹 لوج إن
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component')
        .then(m => m.LoginComponent),
  },

  // 🔹 داشبورد (محمي)
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./views/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
  },

  // 🔹 تيكتس (محمي)
  {
    path: 'tickets',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./views/pages/tickets/tickets.component')
        .then(m => m.TicketsComponent),
  },

  {
    path: 'tickets/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./views/pages/tickets/tickets.component')
        .then(m => m.TicketsComponent),
  },

  // 🔹 أي رابط غلط
  {
    path: '**',
    redirectTo: 'login'
  }
];
