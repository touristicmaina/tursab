import { Injectable } from '@angular/core';
import { query, where } from 'firebase/firestore';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from '@angular/fire/firestore';
import { Client, NewClientData } from '../models/client.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  private formatClientId(index: number): string {
    return index.toString().padStart(4, '0');
  }


  async addClient(data: NewClientData) {
    const user = await this.authService.getCurrentUser();
    const clientsCollection = collection(this.firestore, 'clients');
    const snapshot = await getDocs(clientsCollection);
    const count = snapshot.size;
    const nextId = this.formatClientId(count + 1);
  
    const userDocRef = doc(this.firestore, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
  
    const guideName = userDocSnap.exists() ? userDocSnap.data()['displayName'] || '' : '';
    const guidePhone = userDocSnap.exists() ? userDocSnap.data()['phone'] || '' : '';
  
    const { adults = 0, children = 0, babies = 0 } = data.pax;
  
    // Do not set 'id' yet — let Firestore create it
    const newClientData: Omit<Client, 'id'> = {
      ...data,
      clientId: nextId,
      pax: {
        adults,
        children,
        babies,
        total: adults + children + babies
      },
      createdAt: new Date(),
      createdBy: {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || ''
      },
      guideUid: user.uid,
      guidePhone,
      guideName,
      isActive: data.isActive !== undefined ? data.isActive : "Yes",
    };
  
    const docRef = await addDoc(clientsCollection, newClientData);
    console.log('Client created with ID:', docRef.id);
  }
  

  getClients(): Observable<Client[]> {
    const userPromise = this.authService.getCurrentUser();
    
    return new Observable<Client[]>(observer => {
      userPromise.then(user => {
        if (!user) {
          observer.error(new Error('User not authenticated'));
          return;
        }
      
        const clientsCollection = collection(this.firestore, 'clients');
        const q = query(clientsCollection, where('createdBy.uid', '==', user.uid));
        const clientData = collectionData(q, { idField: 'id' }) as Observable<Client[]>;
        
        clientData.subscribe({
          next: data => observer.next(data),
          error: err => observer.error(err),
          complete: () => observer.complete()
        });
      }).catch(err => observer.error(err));
    });
  }
  

  async updateClient(docId: string, data: Partial<Client>) {
    try {
      const pax = data.pax || {};
      const { adults = 0, children = 0, babies = 0 }: any = pax;
  
      const clientDoc = doc(this.firestore, 'clients', docId);
  
      // Clean undefined fields (Firestore doesn't accept undefined)
      const cleanedData: any = {};
      Object.keys(data).forEach((key) => {
        if (data[key as keyof Client] !== undefined) {
          cleanedData[key] = data[key as keyof Client];
        }
      });
  
      // Ensure pax is always present
      cleanedData.pax = {
        adults,
        children,
        babies,
        total: adults + children + babies,
      };
  
      console.log('Updating Firestore doc with:', cleanedData); // Log data being sent to Firestore
  
      await updateDoc(clientDoc, cleanedData);
      console.log('Client updated in Firestore');
    } catch (error) {
      console.error('Error updating client:', error); // Improved error logging
      throw error;  // Rethrow error after logging
    }
  }
  
  async deleteClientByClientId(clientId: string) {
    const clientsCollection = collection(this.firestore, 'clients');
    const q = query(clientsCollection, where('clientId', '==', clientId));
    const snapshot = await getDocs(q);
  
    if (!snapshot.empty) {
      const docId = snapshot.docs[0].id;
      const clientDoc = doc(this.firestore, `clients/${docId}`);
      return deleteDoc(clientDoc);
    } else {
      throw new Error(`No client found with clientId: ${clientId}`);
    }
  }
  

  private async getUserPhone(uid: string): Promise<string> {
    const userDoc = doc(this.firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDoc);
    const data = userSnapshot.data() as { phone?: string };
    return data?.phone || '';
  }

  async getClientById(docId: string): Promise<{ id: string } & Client | null> {
    const docRef = doc(this.firestore, 'clients', docId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as { id: string } & Client;
    } else {
      return null;
    }
  } 
  
  
}
