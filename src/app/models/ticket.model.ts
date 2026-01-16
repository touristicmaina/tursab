export interface Ticket {
  id?: string;
  ticketNumber?: string;

  client?: {
    id?: string;
    name?: string;
    phone?: string;
    hotel?: string;
    pax?: number;
  };

  activity?: {
    id?: string;
    name?: string;
  };

  salePrice?: {
    amount?: number;
    currency?: string;
  };

  rest?: {
    amount?: number;
    currency?: string;
  };

  paymentStatus?: 'PAID' | 'REST';

  guide?: {
    guideName?: string;
  };
}
