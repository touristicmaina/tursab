import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Layout
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

// Pages
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddClientComponent } from './views/pages/add-client/add-client.component';
import { ClientsListComponent } from './views/pages/clients-list/clients-list.component';
import { ServicesComponent } from './views/pages/services/services.component';
import { AddTicketComponent } from './views/pages/add-ticket/add-ticket.component';
import { TicketsComponent } from './views/pages/tickets/tickets.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'add-client', component: AddClientComponent },
      { path: 'clients', component: ClientsListComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'add-ticket', component: AddTicketComponent },
      { path: 'tickets', component: TicketsComponent }
    ]
  }
];
