import { Component } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {

  constructor(
    private ticketService: TicketService
  ) {}
}
