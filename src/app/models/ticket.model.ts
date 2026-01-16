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

  price?: number;
  currency?: '$' | '€' | '£' | '₺';
  paid?: boolean;
  rest?: number;
}
