import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clients'
    },
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      },
      {
        path: 'create-client',
        loadComponent: () => import('./create-clients/creatclient/creatclient.component').then(m => m.CreatclientComponent),
        data: {
          title: 'Create Client',
        }

      },
      {
        path: 'clients-list',
        loadComponent: () => import('./clients-lists/clientslist/clientslist.component').then(m => m.ClientslistComponent),
        data: {
          title: 'Clients List',
        }
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./create-clients/creatclient/creatclient.component').then(m => m.CreatclientComponent),
      }
    ]
  }
];

