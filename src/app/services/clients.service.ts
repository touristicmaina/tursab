import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ClientModel {
  id?: string;
  name?: string;
  phone?: string;
  hotel?: string;
  pax?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private firestore: Firestore) {}

  getClients(): Observable<ClientModel[]> {
    const ref = collection(this.firestore, 'clients');
    return collectionData(ref, { idField: 'id' }) as Observable<ClientModel[]>;
  }

  addClient(client: ClientModel) {
    const ref = collection(this.firestore, 'clients');
    return addDoc(ref, client);
  }
}
