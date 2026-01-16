import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

export interface ClientModel {
  name: string;
  phone: string;
  pax: number;
  hotel: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ClientsService {

  constructor(private firestore: Firestore) {}

  addClient(client: Omit<ClientModel, 'createdAt'>) {
    const ref = collection(this.firestore, 'clients');

    return addDoc(ref, {
      ...client,
      createdAt: new Date()
    });
  }
}
