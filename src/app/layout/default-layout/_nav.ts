import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard/home',
    iconComponent: { name: 'cil-speedometer' },
    

  },
  {
    title: true,
    name: 'clients'
  },
  {
    name: 'create client',
    url: '/dashboard/clients/create-client',
    iconComponent: { name: 'cil-user-follow' }
  },
  {
    name: 'Clients List',
    url: '/dashboard/clients/clients-list',
    iconComponent: { name: 'cil-list' }
  },
  {
    title: true,
    name: 'Activities'
  },
 
 
  {
  
    name: 'Services',
    url: '/dashboard/activities-names',
    iconComponent: { name: 'cil-puzzle' }
  },

  {
    title: true,
    name: 'Tickets'
  },

  {
  
    name: 'Add Ticket',
    url: '/dashboard/tickets',
    iconComponent: { name: 'cil-pencil' }
  },

  {
  
    name: 'Tickets',
    url: '/dashboard/tickets-list',
    iconComponent: { name: 'cil-notes' }
  },

];
