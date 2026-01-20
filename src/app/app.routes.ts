import { Routes } from '@angular/router';

// Auth
import { LoginComponent } from './view/pages/login/login.component';
import { RegisterComponent } from './view/pages/register/register.component';
import { ResetPasswordComponent } from './view/pages/reset-password/rest-password.component';

// Pages
import { ActivitiesComponent } from './view/pages/activities/activities.component';
import { ActivitiesListComponent } from './view/pages/activities/activitieslist/activitieslist.component';
import { ActivityAnalysisComponent } from './view/pages/activities/activityanalysis/activityanalysis.component';

import { ClientsComponent } from './view/pages/clients/clients.component';
import { ClientsListComponent } from './view/pages/clients/clients-lists/clientslist/clientslist.component';
import { CreateClientComponent } from './view/pages/clients/create-clients/createclient/createclient.component';

import { TicketsComponent } from './view/pages/tickets/tickets.component';
import { TicketListComponent } from './view/pages/tickets/ticketlist/ticketlist.component';
import { TicketViewComponent } from './view/pages/tickets/ticketview/ticketview.component';

// Errors
import { Page404Component } from './view/pages/page404/page404.component';
import { Page500Component } from './view/pages/page500/page500.component';

export const routes: Routes = [

  // =========================
  // Auth Routes
  // =========================
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // =========================
  // Activities
  // =========================
  {
    path: 'activities',
    component: ActivitiesComponent,
    children: [
      { path: '', component: ActivitiesListComponent },
      { path: 'list', component: ActivitiesListComponent },
      { path: 'analysis', component: ActivityAnalysisComponent }
    ]
  },

  // =========================
  // Clients
  // =========================
  {
    path: 'clients',
    component: ClientsComponent,
    children: [
      { path: '', component: ClientsListComponent },
      { path: 'list', component: ClientsListComponent },
      { path: 'create', component: CreateClientComponent }
    ]
  },

  // =========================
  // Tickets
  // =========================
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: '', component: TicketListComponent },
      { path: 'list', component: TicketListComponent },
      { path: 'view/:id', component: TicketViewComponent }
    ]
  },

  // =========================
  // Errors
  // =========================
  { path: '500', component: Page500Component },

  // =========================
  // Redirect & 404
  // =========================
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];
