import { Ticket } from '../../../models/ticket.model';

export class TicketlistComponent {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    // مؤقتاً (أو من السيرفس)
    this.filteredTickets = this.tickets;
  }
}
