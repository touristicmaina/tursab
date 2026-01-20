import { Routes } from '@angular/router';

/* Auth */
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

/* Errors */
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

/* Activities */
import { ActivitiesComponent } from './views/pages/activities/activities/activities.component';
import { ActivitiesListComponent } from './views/pages/activities/activities-list/activities-list.component';
import { ActivityAnalysisComponent } from './views/pages/activities/activity-analysis/activity-analysis.component';

/* Clients */
import { ClientsListComponent } from './views/pages/clients/clients-list/clients-list.component';

/* Tickets */
import { TicketsListComponent } from './views/pages/tickets/tickets-list/tickets-list.component';
import { TicketViewComponent } from './views/pages/tickets/ticket-view/ticket-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  {
    path: 'activities',
    component: ActivitiesComponent,
    children: [
      { path: 'list', component: ActivitiesListComponent },
      { path: 'analysis', component: ActivityAnalysisComponent }
    ]
  },

  { path: 'clients/list', component: ClientsListComponent },

  { path: 'tickets/list', component: TicketsListComponent },
  { path: 'tickets/view', component: TicketViewComponent },

  { path: '500', component: Page500Component },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' }
];
