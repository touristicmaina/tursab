import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private firestore: Firestore) {}

  // --------------------
  // ACTIVITIES
  // --------------------
  getActivities(): Observable<any[]> {
    const ref = collection(this.firestore, 'activities');
    return collectionData(ref, { idField: 'id' });
  }

  // --------------------
  // CLIENTS
  // --------------------
  getClients(): Observable<any[]> {
    const ref = collection(this.firestore, 'clients');
    return collectionData(ref, { idField: 'id' });
  }

  // --------------------
  // CREATE TICKET
  // --------------------
  createTicket(ticket: Partial<Ticket>): Promise<any> {
    const ref = collection(this.firestore, 'tickets');
    return addDoc(ref, ticket);
  }
}
