import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data;
        this.filteredTickets = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
