import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketview',
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
      this.ticketService.getTicketById(ticketId).subscribe({
        next: (data: Ticket | undefined) => {
          if (data) {
            this.ticket = data;
          }
        },
        error: (err: any) => {
          console.error('Error loading ticket', err);
        }
      });
    }
  }
}
