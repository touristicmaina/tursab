import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'Dashboard',
    url: '/',
    iconComponent: { name: 'cil-speedometer' }
  },

  {
    title: true,
    name: 'Clients'
  },
  {
    name: 'Add Client',
    url: '/add-client',
    iconComponent: { name: 'cil-user-plus' }
  },
  {
    name: 'Clients List',
    url: '/clients',
    iconComponent: { name: 'cil-people' }
  },

  {
    title: true,
    name: 'Services'
  },
  {
    name: 'Services',
    url: '/services',
    iconComponent: { name: 'cil-layers' }
  },

  {
    title: true,
    name: 'Tickets'
  },
  {
    name: 'Add Ticket',
    url: '/add-ticket',
    iconComponent: { name: 'cil-plus' }
  },
  {
    name: 'Tickets',
    url: '/tickets',
    iconComponent: { name: 'cil-notes' }
  }

];
