import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsRef;

  constructor(private firestore: Firestore) {
    this.ticketsRef = collection(this.firestore, 'tickets');
  }

  // Get all tickets
  getTickets(): Observable<Ticket[]> {
    return collectionData(this.ticketsRef, { idField: 'id' }) as Observable<Ticket[]>;
  }

  // Create ticket
  createTicket(ticket: Ticket) {
    return addDoc(this.ticketsRef, {
      ...ticket,
      createdAt: new Date()
    });
  }

  // Update ticket status
  updateTicketStatus(ticketId: string, isActive: 'YES' | 'NO') {
    const ticketDoc = doc(this.firestore, `tickets/${ticketId}`);
    return updateDoc(ticketDoc, { isActive });
  }
}
