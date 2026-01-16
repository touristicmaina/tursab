import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets: Ticket[] = [];
  loading = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tickets', err);
        this.loading = false;
      }
    });
  }

  trackById(index: number, ticket: Ticket): string {
    return ticket.id;
  }

  toggleStatus(ticket: Ticket): void {
    const newStatus = ticket.isActive === 'YES' ? 'NO' : 'YES';

    this.ticketService
      .updateTicketStatus(ticket.id, newStatus)
      .then(() => {
        ticket.isActive = newStatus;
      })
      .catch(err => console.error(err));
  }
}
