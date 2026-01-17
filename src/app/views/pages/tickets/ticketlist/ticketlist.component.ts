import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticketlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketlist.component.html'
})
export class TicketlistComponent {

  filteredTickets: any[] = [];

}
