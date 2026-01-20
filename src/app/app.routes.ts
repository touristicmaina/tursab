import { Routes } from '@angular/router';

/* Activities */
import { ActivitieslistComponent } from './views/pages/activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './views/pages/activities/activityanalysis/activityanalysis.component';

/* Clients */
import { ClientslistComponent } from './views/pages/clients/clients-lists/clientslist/clientslist.component';
import { CreateclientComponent } from './views/pages/clients/create-clients/createclient/createclient.component';

/* Tickets */
import { TicketlistComponent } from './views/pages/tickets/ticketlist/ticketlist.component';
import { TicketviewComponent } from './views/pages/tickets/ticketview/ticketview.component';

export const routes: Routes = [

  {
    path: 'activities',
    children: [
      { path: '', component: ActivitieslistComponent },
      { path: 'analysis', component: ActivityanalysisComponent }
    ]
  },

  {
    path: 'clients',
    children: [
      { path: '', component: ClientslistComponent },
      { path: 'create', component: CreateclientComponent }
    ]
  },

  {
    path: 'tickets',
    children: [
      { path: '', component: TicketlistComponent },
      { path: ':id', component: TicketviewComponent }
    ]
  },

];
