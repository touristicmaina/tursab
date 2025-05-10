export interface Client {
  id: string; // Firestore document ID
  clientId: string; 
  name: string;
    phone?: string;
    email?: string;
    hotel: string;
    roomNumber: number;
    pax: {
      adults: number;
      children: number;
      babies: number;
      total: number; // auto calculated
    };
    totalPrice: number;
    deposit: number;
    balance: number;
    currency: 'USD' | 'Euro';
    guideUid: string; // from logged-in user
    guidePhone: string; // from user DB
    guideName: string; // from user DB
    createdBy: {
      uid: string;
      name: string;
      email: string;
    };
    createdAt: Date;
    isActive: 'Yes' | 'No'; 
  }
  
  export type NewClientData = Omit<Client, 'clientId' | 'createdBy' | 'createdAt' | 'guideUid' | 'guidePhone' | 'guideName'>;
  