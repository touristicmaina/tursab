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
import { ActivitieslistComponent } from './views/pages/activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './views/pages/activities/activityanalysis/activityanalysis.component';

/* Clients */
import { ClientslistComponent } from './views/pages/clients/clients-lists/clientslist/clientslist.component';

/* Tickets */
import { TicketlistComponent } from './views/pages/tickets/ticketlist/ticketlist.component';
import { TicketviewComponent } from './views/pages/tickets/ticketview/ticketview.component';

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
      { path: 'list', component: ActivitieslistComponent },
      { path: 'analysis', component: ActivityanalysisComponent }
    ]
  },

  /* Clients */
  { path: 'clients/list', component: ClientslistComponent },

  /* Tickets */
  { path: 'tickets/list', component: TicketlistComponent },
  { path: 'tickets/view', component: TicketviewComponent },

  /* Errors */
  { path: '500', component: Page500Component },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' }
];
