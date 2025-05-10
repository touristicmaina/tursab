import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ColComponent, TextColorDirective,
  CardComponent, CardHeaderComponent, CardBodyComponent,
  TableDirective,
} from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { Client } from '../../../../../models/client.model';
import { ClientService } from '../../../../../services/clients.service';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { cilTrash, cilPencil } from '@coreui/icons';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-clientslist',
  standalone: true,
  imports: [
    CommonModule, ColComponent, TextColorDirective,
    CardComponent, CardHeaderComponent, CardBodyComponent,
    TableDirective, FormsModule, ReactiveFormsModule,MatIconModule,RouterLink
  ],
 
  templateUrl: './clientslist.component.html',
  styleUrl: './clientslist.component.scss'
})
export class ClientslistComponent {
  mode: 'create' | 'edit' = 'create';
  isToggled = false;

  searchControl = new FormControl('');
  clients: Client[] = [];
  filteredClients: Client[] = [];

  constructor(private clientsServices: ClientService,private iconSet: IconSetService,private router: Router,) {
    this.getAllClients();
    this.iconSet.icons = { cilTrash, cilPencil };
    // Trigger filtering whenever input changes
    this.searchControl.valueChanges.subscribe(searchText => {
      this.filterClients(searchText || '');
    });
  }

  getAllClients() {
    this.clientsServices.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = [...data]; // Initial state
      },
      error: (err) => {
        Swal.fire({
          title: "Error!",
          text: err,
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  }

  filterClients(searchText: string) {
    const lowerText = searchText.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name?.toLowerCase().includes(lowerText)
    );
  }

  confirmDelete(client: Client) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete client ${client.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClient(client);
      }
    });
  }
  
  private deleteClient(client: Client) {
    if (!client.clientId) {
      Swal.fire('Error', 'Cannot delete: Missing document ID.', 'error');
      return;
    }
  
    this.clientsServices.deleteClientByClientId(client.clientId).then(() => {
      // Refresh list after deletion
      this.getAllClients();
      Swal.fire('Deleted!', 'Client has been deleted.', 'success');
    }).catch((err) => {
      Swal.fire('Error', 'Failed to delete client.', 'error');
      console.error(err);
    });
  }
  
}
