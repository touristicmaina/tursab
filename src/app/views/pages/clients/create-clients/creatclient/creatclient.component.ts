import { Component } from '@angular/core';
import { ClientsService, ClientModel } from '../../../../../services/clients.service';

@Component({
  selector: 'app-creatclient',
  templateUrl: './creatclient.component.html'
})
export class CreatclientComponent {

  client: ClientModel = {
    name: '',
    phone: '',
    hotel: '',
    pax: 1
  };

  constructor(private clientService: ClientsService) {}

  saveClient() {
    this.clientService.addClient(this.client);
  }
}
