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
import { AuthService } from './auth.service';
import { Ticket, Currency, PaymentStatus } from '../models/ticket.model';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/* أسعار التحويل */
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  TRY: 32
};

@Injectable({ providedIn: 'root' })
export class TicketService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  /* توليد رقم تيكت */
  private formatTicketId(index: number): string {
    return index.toString().padStart(5, '0');
  }

  /* حساب السعر النهائي */
  private calculateFinalPrice(
    basePriceUSD: number,
    pax: number,
    currency: Currency
  ): number {
    const totalUSD = basePriceUSD * pax;
    return +(totalUSD * EXCHANGE_RATES[currency]).toFixed(2);
  }

  /* إنشاء تيكت جديد */
  async createTicket(data: {
    clientName: string;
    hotel: string;
    pax: number;
    activityName: string;
    basePriceUSD: number;
    currency: Currency;
    paymentStatus: PaymentStatus;
    restAmount?: number;
    restCurrency?: Currency;
  }) {

    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const ticketsCollection = collection(this.firestore, 'tickets');
    const snapshot = await getDocs(ticketsCollection);
    const ticketId = this.formatTicketId(snapshot.size + 1);

    const finalAmount = this.calculateFinalPrice(
      data.basePriceUSD,
      data.pax,
      data.currency
    );

    const ticket: Ticket = {
      ticketId,
      client: {
        name: data.clientName,
        hotel: data.hotel,
        pax: data.pax
      },
      activity: {
        name: data.activityName,
        basePriceUSD: data.basePriceUSD
      },
      finalPrice: {
        amount: finalAmount,
        currency: data.currency
      },
      payment: {
        status: data.paymentStatus,
        restAmount: data.paymentStatus === 'Rest' ? data.restAmount : undefined,
        restCurrency: data.paymentStatus === 'Rest' ? data.restCurrency : undefined
      },
      createdAt: new Date(),
      createdBy: {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || ''
      }
    };

    const docRef = await addDoc(ticketsCollection, ticket);

    await addDoc(collection(this.firestore, 'ticket_logs'), {
      ticketId: docRef.id,
      action: 'CREATED',
      createdAt: new Date(),
      userId: user.uid
    });
  }

  /* جلب كل التذاكر للمستخدم */
  async getTickets(): Promise<Observable<Ticket[]>> {
    const user = await this.authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const q = query(
      collection(this.firestore, 'tickets'),
      where('createdBy.uid', '==', user.uid)
    );

    return collectionData(q, { idField: 'id' }) as Observable<Ticket[]>;
  }

  /* جلب تيكت بواسطة ID */
  async getTicketById(ticketId: string): Promise<Ticket | null> {
    const q = query(
      collection(this.firestore, 'tickets'),
      where('ticketId', '==', ticketId)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as Ticket;
  }

  /* إحصائيات (للتقارير لاحقًا) */
  async getSalesStats(from: Date, to: Date) {
    const q = query(
      collection(this.firestore, 'tickets'),
      where('createdAt', '>=', from),
      where('createdAt', '<=', to)
    );

    const snapshot = await getDocs(q);

    let totalSales = 0;
    let totalRest = 0;

    snapshot.forEach(doc => {
      const ticket = doc.data() as Ticket;
      totalSales += ticket.finalPrice.amount;

      if (ticket.payment.status === 'Rest') {
        totalRest += ticket.payment.restAmount || 0;
      }
    });

    return {
      totalSales,
      totalRest,
      count: snapshot.size
    };
  }
}
  if (clientSnapshot.empty) {
    throw new Error(`Client with ID ${clientId} not found`);
  }

  const clientDocSnap = clientSnapshot.docs[0];
  const clientDocId = clientDocSnap.id;
  const clientData = clientDocSnap.data() as Ticket['client'];

  // 🔄 Sum existing tickets for this client
  const ticketsCollection = collection(this.firestore, 'tickets');
  const ticketsQuery = query(ticketsCollection, where('client.clientId', '==', clientDocId));
  const ticketSnapshots = await getDocs(ticketsQuery);

  let totalFromExistingTickets = 0;
  ticketSnapshots.forEach(doc => {
    const ticket = doc.data() as Ticket;
    totalFromExistingTickets += Number(ticket.salePrice) || 0;
  });



  // 🧾 Create new ticket
  const newTicket: Ticket = {
    ...data,
    ticketId: nextId,
    activity: {
      activityserviceId: data.activity.activityserviceId,
      activityName: data.activity.activityName
    },
    client: {
      name: data.client.name,
      clientId: clientDocId, // Firestore document ID now stored
      pax: data.client.pax,
      hotel: data.client.hotel,
      roomNumber: data.client.roomNumber,
      deposit: data.client.deposit,
      phone: await this.getUserPhone(clientDocId),
      guideName: data.client.guideName,
      currency: data.client.currency,
    },
    createdAt: new Date(),
    createdBy: {
      uid: user.uid,
      name: user.displayName || '',
      email: user.email || ''
    },
    updatedAt: new Date(),
    updatedBy: {
      uid: user.uid,
      name: user.displayName || '',
      email: user.email || ''
    },
    pickupPoint: data.pickupPoint,
    pickupTime: data.pickupTime,
    day: data.day,
    Date: data.Date,
    guide: {
      guideId: user.uid,
      guidePhone: await this.getUserPhone(user.uid)
    },
    salePrice: data.salePrice,
    isActive: data.isActive !== undefined ? data.isActive : "Yes",
    balance: data.balance !== undefined ? data.balance : "Unpaid",
  };

 const docRef = await addDoc(ticketssCollection, newTicket);
   // Step 3: Update the newly added document to include its Firestore ID
  await updateDoc(docRef, {
    id: docRef.id
  });

   console.log('Client created with ID and saved in document field:', docRef.id);
}



      async getTickets(): Promise<Observable<Ticket[]>> {
        const user =  this.authService.getCurrentUser();
        
        // Ensure the user is authenticated
        if (!user) {
          throw new Error('User not authenticated');
        }
      
        const ticketsCollection = collection(this.firestore, 'tickets');
        
        // Create a query where createdBy.uid matches the current user's UID
        const q = query(ticketsCollection, where('createdBy.uid', '==', (await user).uid));
        
        // Use the query to fetch data
        return collectionData(q, { idField: 'id' }) as Observable<Ticket[]>;
      }
      
  
    async updateTickets(docId: string, data: Ticket) {
   
  
      const ticketDoc = doc(this.firestore, `tickets/${docId}`);
      return updateDoc(ticketDoc, {
        ...data,
 
      });
    }
  
    async deleteTicket(ticketId: string) {
      const ticketCollection = collection(this.firestore, 'tickets');
      const q = query(ticketCollection, where('ticketId', '==', ticketId));
      const snapshot = await getDocs(q);
    
      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        const ticketDoc = doc(this.firestore, `tickets/${docId}`);
        return deleteDoc(ticketDoc);
      } else {
        throw new Error(`No ticket found with ticketId: ${ticketId}`);
      }
    }
    
  
    private async getUserPhone(uid: string): Promise<string> {
      const userDoc = doc(this.firestore, `users/${uid}`);
      const userSnapshot = await getDoc(userDoc);
      const data = userSnapshot.data() as { phone?: string };
      return data?.phone || '';
    }
  
    async getTicketById(ticketId: string): Promise<{ id: string } & Ticket | null> {
      const ticketCollection = collection(this.firestore, 'tickets');
      const q = query(ticketCollection, where('id', '==', ticketId));
      const snapshot = await getDocs(q);
    
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as { id: string } & Ticket;
      } else {
        return null;
      }

    }

    async getTicketByDocId(docId: string): Promise<Ticket | null> {
      const ticketDocRef = doc(this.firestore, `tickets/${docId}`);
      const snapshot = await getDoc(ticketDocRef);
      if (snapshot.exists()) {
        return snapshot.data() as Ticket;
      }
      return null;
    }
    
    
     async fetchTicketDocId(ticket: Ticket): Promise<string | null> {
      const ticketRef = collection(this.firestore, 'tickets');
      const q = query(ticketRef, where('ticketId', '==', ticket.ticketId));
      const snapshot = await getDocs(q);
    
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return doc.id;
      } else {
        console.warn('No ticket document found for ticketId:', ticket.ticketId);
        return null;
      }
    }

async getTotalPrice(clientId: string): Promise<number> {
  // const user = await this.authService.getCurrentUser();

  // if (!user) {
  //   throw new Error('User not authenticated');
  // }

  const ticketsCollection = collection(this.firestore, 'tickets');

  // 🔍 Query tickets for the given client (by Firestore doc ID)
  const q = query(
    ticketsCollection,
    where('client.clientId', '==', clientId),
    where('isActive', '==', 'Yes') // Optional: limit to active tickets
  );

  const snapshot = await getDocs(q);

  let totalPrice = 0;
  snapshot.forEach(doc => {
    const ticket = doc.data() as Ticket;
    totalPrice += Number(ticket.salePrice) || 0;
  });

  return totalPrice;
}

    
}
