export interface Ticket {
  id: string;                // Firestore document ID
  ticketNumber: string;      // Auto generated (0001, 0002...)

  isActive: 'YES' | 'NO';    // Ticket status

  client: {
    clientId: string;
    name: string;
    phone: string;
    hotel: string;
    pax: number;
  };

  activity: {
    activityId: string;
    name: string;
  };

  salePrice: {
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'TRY';
  };

  paymentStatus: 'PAID' | 'REST';

  rest?: {
    amount: number;
    currency: 'USD' | 'EUR' | 'GBP' | 'TRY';
  };

  pickupPoint: string;
  pickupTime: string; // 24h format "08:00", "20:00"

  guide: {
    guideId: string;
    guideName: string;
    guidePhone: string;
  };

  activityDate: string; // yyyy-MM-dd

  createdBy: {
    uid: string;
    name: string;
    email: string;
  };

  createdAt: Date;
}
