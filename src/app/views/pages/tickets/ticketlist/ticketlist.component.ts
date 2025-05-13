import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ColComponent, TextColorDirective,
  CardComponent, CardHeaderComponent, CardBodyComponent,
  TableDirective,
} from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { Timestamp } from 'firebase/firestore';


import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { cilTrash, cilPencil } from '@coreui/icons';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../../../models/ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketServices } from '../../../../services/ticket.service';
import { TicketPdfComponent } from '../ticket-pdf.component';
import * as XLSX from 'xlsx'; // Import XLSX library

@Component({
  selector: 'app-ticketlist',
  imports: [
    CommonModule, ColComponent, TextColorDirective,
    CardComponent, CardHeaderComponent, CardBodyComponent,
    TableDirective, FormsModule, ReactiveFormsModule,MatIconModule,RouterLink
  ],
 
  templateUrl: './ticketlist.component.html',
  styleUrl: './ticketlist.component.scss'
})
export class TicketlistComponent {
 mode: 'create' | 'edit' = 'create';
  isToggled = false;

  searchControl = new FormControl('');
  ticket: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  constructor(
    private ticketsServices: TicketServices,
    private iconSet: IconSetService,
    private router: Router,
    private modalService: NgbModal 
  ) {
    this.getAllTickets();
    this.iconSet.icons = { cilTrash, cilPencil };
    // Trigger filtering whenever input changes
    this.searchControl.valueChanges.subscribe(searchText => {
      this.filterTickets(searchText || '');
    });
  }

  async getAllTickets() {
    (await this.ticketsServices.getTickets()).subscribe({
      next: (data:any) => {
        this.ticket = data;
        this.filteredTickets = [...data]; // Initial state
      },
      error: (err:any) => {
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

  filterTickets(searchText: string) {
    const lowerText = searchText.toLowerCase();
    this.filteredTickets = this.ticket.filter(ticket =>
      ticket.client.name?.toLowerCase().includes(lowerText)
    );
  }

  confirmDelete(ticket: Ticket) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete ticket ${ticket.activity.activityName}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTicket(ticket);
      }
    });
  }
  
  private deleteTicket(ticket: Ticket) {
    if (!ticket.ticketId) {
      Swal.fire('Error', 'Cannot delete: Missing document ID.', 'error');
      return;
    }
  
    this.ticketsServices.deleteTicket(ticket.ticketId).then(() => {
      // Refresh list after deletion
      this.getAllTickets();
      Swal.fire('Deleted!', 'Ticket has been deleted.', 'success');
    }).catch((err) => {
      Swal.fire('Error', 'Failed to delete ticket.', 'error');
      console.error(err);
    });
  }

  downloadPDF(ticket: Ticket) {
    const modalRef = this.modalService.open(TicketPdfComponent);
    modalRef.componentInstance.ticket = ticket; // Pass the ticket to the modal
  }

  
 getPickTime(ticket: Ticket): string {
  if (!ticket?.pickupTime) return '';

  let date: Date;
  const pickupTime = ticket.pickupTime;

  if (pickupTime && typeof pickupTime === 'object' && 'toDate' in pickupTime) {
    date = (pickupTime as Timestamp).toDate();
  } else {
    date = new Date(pickupTime);
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}

    

    downloadExcel() {
    // Prepare data from filteredTickets for Excel export
    const worksheet = XLSX.utils.json_to_sheet(this.filteredTickets.map(ticket => ({
      ID: ticket.ticketId,
      Client: ticket.client.name,
      Activity: ticket.activity.activityName,
      Hotel: ticket.client.hotel,
      roon_Number: ticket.client.roomNumber,
      pax: this.getPaxTotal(ticket.client.pax),
      Day:ticket.day,
      Date:ticket.Date,
    Time: this.getPickTime(ticket),
      Active: ticket.isActive,
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
    
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'tickets.xlsx');
  }

    getPaxTotal(pax: any): number {
    return pax?.total ?? 0;
  }

}
