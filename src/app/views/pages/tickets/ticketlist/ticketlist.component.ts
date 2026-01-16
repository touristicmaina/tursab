import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../services/ticket.service';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrls: ['./ticketlist.component.scss']
})
export class TicketlistComponent implements OnInit {

  tickets: Ticket[] = [];

  constructor(
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    // مثال مؤقت – لاحقًا تربطه مع Firestore getTickets()
    // this.ticketService.getTickets().subscribe(data => {
    //   this.tickets = data;
    // });

    // Dummy data فقط حتى لا يعطي خطأ
    this.tickets = [];
  }

  /**
   * تحويل حالة الدفع لعرض مفهوم
   */
  getPaymentLabel(ticket: Ticket): string {
    return ticket.paymentStatus === 'PAID' ? 'Paid' : 'Rest';
  }
}
