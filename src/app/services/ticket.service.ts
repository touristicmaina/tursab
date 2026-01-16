import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  Timestamp
} from '@angular/fire/firestore';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private firestore: Firestore) {}

  async createTicket(data: Ticket): Promise<void> {
    const ticketsRef = collection(this.firestore, 'tickets');

    const ticket: Ticket = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await addDoc(ticketsRef, {
      ...ticket,
      createdAt: Timestamp.fromDate(ticket.createdAt),
      updatedAt: Timestamp.fromDate(ticket.updatedAt),
      day: Timestamp.fromDate(ticket.day),
      Date: Timestamp.fromDate(ticket.Date)
    });
  }
}
