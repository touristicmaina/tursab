import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './auth/login.component';
import { LayoutComponent } from './layout/layout.component';

import { DashboardComponent } from './pages/dashboard.component';
import { AddClientComponent } from './pages/add-client.component';
import { ClientsListComponent } from './pages/clients-list.component';
import { ServicesComponent } from './pages/services.component';
import { AddTicketComponent } from './pages/add-ticket.component';
import { TicketsComponent } from './pages/tickets.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
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
