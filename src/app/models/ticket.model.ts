export interface Ticket {
  ticketId?: string;
  client?: {
    name?: string;
    phone?: string;
  };
  activity?: {
    name?: string;
  };
  salePrice?: {
    amount?: number;
    currency?: string;
  };
  paymentStatus?: string;
  activityDate?: Date;
}
