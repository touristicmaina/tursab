import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private firestore: Firestore) {}

  addTicket(ticket: Ticket) {
    const ticketsRef = collection(this.firestore, 'tickets');
    return addDoc(ticketsRef, ticket);
  }
}
