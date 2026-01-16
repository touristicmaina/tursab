import { Component } from '@angular/core';

@Component({
  selector: 'app-clientslist',
  templateUrl: './clientslist.component.html',
  styleUrls: ['./clientslist.component.scss']
})
export class ClientslistComponent {

  client = {
    name: '',
    phone: '',
    pax: 1,
    hotel: '',
    guideName: '',
    guidePhone: '',
    finalPrice: 0,
    currency: '€',
    paid: false,
    rest: 0
  };

  currencies = ['€', '$', '£', '₺'];

  onPaidChange() {
    if (this.client.paid) {
      this.client.rest = 0;
    }
  }

  saveClient() {
    console.log('CLIENT DATA', this.client);
    // لاحقاً: Firestore / API
  }
}
