import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketview',
  templateUrl: './ticketview.component.html'
})
export class TicketviewComponent implements OnInit {

  ticket?: Ticket;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticket = await this.ticketService.getTicketById(id) ?? undefined;
    }
  }
}
