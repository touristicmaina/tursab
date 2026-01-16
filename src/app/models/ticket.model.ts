export interface Ticket {
  id?: string;

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
    currency?: 'USD' | 'EUR' | 'GBP' | 'TRY';
  };

  paymentStatus?: 'PAID' | 'REST';

  rest?: {
    amount?: number;
    currency?: 'USD' | 'EUR' | 'GBP' | 'TRY';
  };
}
