import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {

  mode: 'add' | 'edit' = 'add';

  formValue: any = {
    client: {
      id: '',
      name: '',
      phone: '',
      hotel: '',
      pax: 1
    },
    activity: {
      id: '',
      name: ''
    },
    salePrice: 0,
    currency: 'USD',
    paymentStatus: 'PAID',
    restAmount: 0
  };

  saveTicket() {

    const ticket: Partial<Ticket> = {
      client: this.formValue.client,
      activity: this.formValue.activity,
      salePrice: {
        amount: this.formValue.salePrice,
        currency: this.formValue.currency
      },
      paymentStatus: this.formValue.paymentStatus,
      rest: this.formValue.paymentStatus === 'PAID'
        ? { amount: 0, currency: this.formValue.currency }
        : { amount: this.formValue.restAmount, currency: this.formValue.currency }
    };

    console.log('TICKET:', ticket);
  }
}
