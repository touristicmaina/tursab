export interface Ticket {
  id: string;
  ticketNumber: string;

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
  pickupTime: string;

  guide: {
    guideId: string;
    guideName: string;
    guidePhone: string;
  };

  activityDate: string;
  createdAt: Date;
}
