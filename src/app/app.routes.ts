import { Routes } from '@angular/router';

// Reset password
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

// Activities
import { ActivitiesComponent } from './views/pages/activities/activities.component';
import { ActivitieslistComponent } from './views/pages/activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './views/pages/activities/activityanalysis/activityanalysis.component';

// Clients
import { ClientslistComponent } from './views/pages/clients/clients-lists/clientslist/clientslist.component';
import { CreateclientComponent } from './views/pages/clients/create-clients/createclient/createclient.component';

// Tickets
import { TicketlistComponent } from './views/pages/tickets/ticketlist/ticketlist.component';
import { TicketviewComponent } from './views/pages/tickets/ticketview/ticketview.component';

export const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'activities', component: ActivitiesComponent },
  { path: 'activities/list', component: ActivitieslistComponent },
  { path: 'activities/analysis', component: ActivityanalysisComponent },

  { path: 'clients', component: ClientslistComponent },
  { path: 'clients/create', component: CreateclientComponent },

  { path: 'tickets', component: TicketlistComponent },
  { path: 'tickets/view', component: TicketviewComponent },

  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  { path: '**', redirectTo: 'activities' }
];
