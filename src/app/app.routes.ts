import { Routes } from '@angular/router';

// =========================
// Auth
// =========================
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

// =========================
// Activities
// =========================
import { ActivitiesComponent } from './views/pages/activities/activities.component';
import { ActivitiesListComponent } from './views/pages/activities/activities-list/activities-list.component';
import { ActivityAnalysisComponent } from './views/pages/activities/activity-analysis/activity-analysis.component';

// =========================
// Clients
// =========================
import { ClientsComponent } from './views/pages/clients/clients.component';
import { ClientsListComponent } from './views/pages/clients/clients-list/clients-list.component';
import { CreateClientComponent } from './views/pages/clients/create-client/create-client.component';

// =========================
// Tickets
// =========================
import { TicketsComponent } from './views/pages/tickets/tickets.component';
import { TicketListComponent } from './views/pages/tickets/ticket-list/ticket-list.component';
import { TicketViewComponent } from './views/pages/tickets/ticket-view/ticket-view.component';

// =========================
// Errors
// =========================
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

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
