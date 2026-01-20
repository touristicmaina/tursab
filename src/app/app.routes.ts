import { Routes } from '@angular/router';

/* Auth */
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';

/* Pages */
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

/* Activities */
import { ActivitieslistComponent } from './views/pages/activities/activitieslist/activitieslist.component';
import { ActivityanalysisComponent } from './views/pages/activities/activityanalysis/activityanalysis.component';

/* Clients */
import { ClientslistComponent } from './views/pages/clients/clients-lists/clientslist/clientslist.component';

/* Tickets */
import { TicketlistComponent } from './views/pages/tickets/ticketlist/ticketlist.component';
import { TicketviewComponent } from './views/pages/tickets/ticketview/ticketview.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'activities/list', component: ActivitieslistComponent },
  { path: 'activities/analysis', component: ActivityanalysisComponent },

  { path: 'clients/list', component: ClientslistComponent },

  { path: 'tickets/list', component: TicketlistComponent },
  { path: 'tickets/view', component: TicketviewComponent },

  { path: '500', component: Page500Component },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '404' }
];
