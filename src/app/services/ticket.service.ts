import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private firestore: Firestore) {}

  private ticketsCollection = collection(this.firestore, 'tickets');

  // ✅ get all tickets
  getTickets(): Observable<Ticket[]> {
    return collectionData(this.ticketsCollection, { idField: 'id' }) as Observable<Ticket[]>;
  }

  // ✅ get ticket by firestore id
  async getTicketById(id: string): Promise<Ticket | null> {
    const ref = doc(this.firestore, `tickets/${id}`);
    const snap = await getDoc(ref);
    return snap.exists() ? { id: snap.id, ...snap.data() } as Ticket : null;
  }

  // ✅ create ticket
  async createTicket(ticket: Ticket): Promise<void> {
    await addDoc(this.ticketsCollection, {
      ...ticket,
      createdAt: new Date()
    });
  }
}
