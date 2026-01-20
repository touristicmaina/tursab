import { Routes } from '@angular/router';

/* Auth */
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

/* Pages */
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

/* Activities */
import { ActivitiesComponent } from './views/pages/activities/activities.component';
import { ActivitiesListComponent } from './views/pages/activities/activitieslist/activitieslist.component';
import { ActivityAnalysisComponent } from './views/pages/activities/activityanalysis/activityanalysis.component';

/* Clients */
import { ClientsComponent } from './views/pages/clients/clients.component';
import { ClientsListComponent } from './views/pages/clients/clients-lists/clientslist/clientslist.component';
import { CreateClientComponent } from './views/pages/clients/create-clients/createclient/createclient.component';

/* Tickets */
import { TicketsComponent } from './views/pages/tickets/tickets.component';
import { TicketListComponent } from './views/pages/tickets/ticketlist/ticketlist.component';
import { TicketViewComponent } from './views/pages/tickets/ticketview/ticketview.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /* Auth */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  /* Activities */
  {
    path: 'activities',
    component: ActivitiesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ActivitiesListComponent },
      { path: 'analysis', component: ActivityAnalysisComponent }
    ]
  },

  /* Clients */
  {
    path: 'clients',
    component: ClientsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ClientsListComponent },
      { path: 'create', component: CreateClientComponent }
    ]
  },

  /* Tickets */
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TicketListComponent },
      { path: 'view', component: TicketViewComponent }
    ]
  },

  /* Errors */
  { path: '500', component: Page500Component },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' }
];
