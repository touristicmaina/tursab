import { ActivitiesComponent } from './views/pages/activities/activities/activities.component';
import { ActivitieslistComponent } from './views/pages/activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './views/pages/activities/activityanalysis/activityanalysis.component';
import {TicketsComponent} from './views/pages/tickets/tickets.component'
import {TicketlistComponent} from './views/pages/tickets/ticketlist/ticketlist.component'

import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from '../guards/auth.guard';
import { CreatclientComponent } from './views/pages/clients/create-clients/creatclient/creatclient.component';
import { TicketviewComponent } from './views/pages/tickets/ticketview/ticketview.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

export const routes: Routes = [
  // Redirect root to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'tickets-view/:id',
   loadComponent: () =>TicketviewComponent
  },

  // Public login page
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login Page' }
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./views/pages/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent)
  },  


  // Protected area (requires authentication)
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: { title: 'Home' },
    children: [
      {
        path: 'dashboard/home',
        loadChildren: () =>
          import('./views/dashboard/routes').then(m => m.routes)
      },
      {
        path: 'dashboard/clients',
        loadChildren: () =>
          import('./views/pages/clients/routes').then(m => m.routes)
      },
      {
        path: 'dashboard/activities',
       loadComponent: () =>ActivitiesComponent,
       data: { title: 'Activities' }
      },
      {
        path: 'dashboard/activities-names',
       loadComponent: () =>ActivitieslistComponent,
        data: { title: 'Services Names' }
      },
      {
        path: 'dashboard/activities-names-edit/:id',
       loadComponent: () =>ActivitieslistComponent
      },
      {
        path: 'dashboard/tickets',
       loadComponent: () =>TicketsComponent,
        data: { title: 'Add Ticket' }
      },

      {
        path : 'dashboard/tickets-list',
        loadComponent:()=> TicketlistComponent,
        data: { title: 'Tickets List' }
      },

      
      {
        path : 'dashboard/tickets/edit/:id',
        loadComponent:()=> TicketsComponent,
        data: { title: 'Tickets Edit' }
      },
   
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/routes').then(m => m.routes)
      },
      
  
 
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/routes').then(m => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/routes').then(m => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then(m => m.routes)
      },
      { path: 'create-client', component: CreatclientComponent },
      // Example of an admin-only section
      // {
      //   path: 'admin',
      //   loadChildren: () =>
      //     import('./views/admin/routes').then(m => m.routes),
      //   canActivate: [RoleGuard],
      //   data: { roles: [UserRole.SUPERADMIN, UserRole.ADMIN] }
      // }
    ]
  },

  // Error pages
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: { title: 'Page 404' }
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: { title: 'Page 500' }
  },

  // Catch-all
  { path: '**', redirectTo: 'dashboard' }
];
