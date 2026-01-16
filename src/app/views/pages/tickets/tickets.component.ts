import { Component } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {

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
      client: {
        id: this.formValue.client.id,
        name: this.formValue.client.name,
        phone: this.formValue.client.phone,
        hotel: this.formValue.client.hotel,
        pax: this.formValue.client.pax
      },
      activity: {
        id: this.formValue.activity.id,
        name: this.formValue.activity.name
      },
      salePrice: {
        amount: this.formValue.salePrice,
        currency: this.formValue.currency
      },
      paymentStatus: this.formValue.paymentStatus,
      rest: this.formValue.paymentStatus === 'PAID'
        ? { amount: 0, currency: this.formValue.currency }
        : { amount: this.formValue.restAmount, currency: this.formValue.currency }
    };

    console.log('TICKET SAVED:', ticket);
  }
}
