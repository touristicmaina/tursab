import { Routes } from '@angular/router';

// =======================
// Auth
// =======================
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/rest-password.component';

// =======================
// Activities
// =======================
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitieslistComponent } from './activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './activities/activityanalysis/activityanalysis.component';

// =======================
// Clients
// =======================
import { ClientsComponent } from './clients/clients.component';
import { ClientslistComponent } from './clients/clients-lists/clientslist/clientslist.component';
import { CreateclientComponent } from './clients/create-clients/createclient/createclient.component';

// =======================
// Tickets
// =======================
import { TicketsComponent } from './tickets/tickets.component';
import { TicketlistComponent } from './tickets/ticketlist/ticketlist.component';
import { TicketviewComponent } from './tickets/ticketview/ticketview.component';

// =======================
// Errors
// =======================
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  {
    path: 'activities',
    component: ActivitiesComponent,
    children: [
      { path: '', component: ActivitieslistComponent },
      { path: 'list', component: ActivitieslistComponent },
      { path: 'analysis', component: ActivityanalysisComponent }
    ]
  },

  {
    path: 'clients',
    component: ClientsComponent,
    children: [
      { path: '', component: ClientslistComponent },
      { path: 'list', component: ClientslistComponent },
      { path: 'create', component: CreateclientComponent }
    ]
  },

  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: '', component: TicketlistComponent },
      { path: 'list', component: TicketlistComponent },
      { path: 'view/:id', component: TicketviewComponent }
    ]
  },

  { path: '500', component: Page500Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];
