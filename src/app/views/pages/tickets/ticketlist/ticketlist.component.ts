import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
})
export class TicketlistComponent implements OnInit {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      this.filteredTickets = tickets;
    });
  }
}
