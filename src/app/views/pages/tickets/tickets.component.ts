import { Component } from '@angular/core';
import { Ticket } from '../../../models/ticket.model';
import { ClientsService } from '../../../services/clients.service';
import { ServicesListService } from '../../../services/serviceslist.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {

  ticket: Partial<Ticket> = {};
  mode: 'add' | 'edit' = 'add';

  constructor(
    private clientService: ClientsService,
    private activityService: ServicesListService
  ) {}
}
