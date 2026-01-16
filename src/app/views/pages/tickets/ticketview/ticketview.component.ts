import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketview.component.html',
  styleUrls: ['./ticketview.component.scss']
})
export class TicketviewComponent implements OnInit {

  ticket?: Ticket;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.ticketService.getTicketById(ticketId).subscribe(ticket => {
        this.ticket = ticket;
      });
    }
  }
}
