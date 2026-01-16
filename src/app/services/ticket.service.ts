import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [];

  constructor() {}

  // ✅ get all tickets
  getTickets(): Observable<Ticket[]> {
    return of(this.tickets);
  }

  // ✅ get ticket by id
  getTicketById(id: string): Observable<Ticket | undefined> {
    const ticket = this.tickets.find(t => t.id === id);
    return of(ticket);
  }

  // ✅ USED IN tickets.component.ts
  getActivities(): Observable<any[]> {
    return of([]);
  }

  // ✅ USED IN tickets.component.ts
  getClients(): Observable<any[]> {
    return of([]);
  }

  // ✅ USED IN tickets.component.ts
  createTicket(ticket: Ticket): void {
    ticket.id = Date.now().toString();
    this.tickets.push(ticket);
  }
}
