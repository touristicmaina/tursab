import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  client = {
    name: '',
    phone: '',
    pax: 1,
    hotel: ''
  };

  loading = false;

  constructor(private clientsService: ClientsService) {}

  async saveClient() {
    this.loading = true;

    try {
      await this.clientsService.addClient(this.client);
      alert('Client saved successfully ✅');

      // reset form
      this.client = {
        name: '',
        phone: '',
        pax: 1,
        hotel: ''
      };

    } catch (error) {
      console.error(error);
      alert('Error saving client ❌');
    } finally {
      this.loading = false;
    }
  }
}
