import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.filteredTickets = this.tickets;
  }
}
