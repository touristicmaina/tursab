import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketview',
  templateUrl: './ticketview.component.html',
  styleUrls: ['./ticketview.component.scss']
})
export class TicketviewComponent implements OnInit {

  ticket!: Ticket;

  constructor(
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    // لاحقًا تجيب التكت من Firestore
  }
}
