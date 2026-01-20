import { Routes } from '@angular/router';

/* Activities */
import { ActivitieslistComponent } from './activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './activities/activityanalysis/activityanalysis.component';

/* Clients */
import { ClientslistComponent } from './clients/clients-lists/clientslist/clientslist.component';
import { CreateclientComponent } from './clients/create-clients/createclient/createclient.component';

/* Tickets */
import { TicketlistComponent } from './tickets/ticketlist/ticketlist.component';
import { TicketviewComponent } from './tickets/ticketview/ticketview.component';

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
  }

];
