import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Ticket } from '../../../../models/ticket.model';
import { ServicesListService } from '../../../../services/serviceslist.service';
import { ActivatedRoute } from '@angular/router';
import { TicketServices } from '../../../../services/ticket.service';
import { documentId } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { Timestamp } from 'firebase/firestore';
import { setLogLevel, LogLevel } from "@angular/fire";

setLogLevel(LogLevel.VERBOSE);
@Component({
  selector: 'app-ticketview',
  imports: [CommonModule],
  templateUrl: './ticketview.component.html',
  styleUrl: './ticketview.component.scss',
})
export class TicketviewComponent {
  ticket: Ticket | null = null;
  totalPrice: number=0;

  constructor(
    private cdr: ChangeDetectorRef,
    private ticketService: TicketServices,
    private route: ActivatedRoute
  ) {
    this.fetchTotalPrice();
  }

  ngOnInit(): void {

    
    this.route.paramMap.subscribe((params) => {
      const ticketId = params.get('id');
      if (ticketId) {
        this.loadTicket(ticketId);
      }
    });

  }


private async fetchTotalPrice(): Promise<void> {
  const clientId = this.ticket?.client?.clientId;


  if (!clientId) {
    console.error('Missing client ID, cannot fetch total price.');
    return;
  }

  try {
    const totalPrice = await this.ticketService.getTotalPrice(clientId);
    this.totalPrice = totalPrice ?? 0;
    console.log('Total price fetched:', this.totalPrice);
  } catch (error) {
    console.error('Error fetching total price:', error);
  }
}

  

  getPickTime(): string {
    if (!this.ticket?.pickupTime) return '';
  
    let date: Date;
  
    const pickupTime = this.ticket.pickupTime;
  
    // Handle Firestore Timestamp
    if (pickupTime && typeof pickupTime === 'object' && 'toDate' in pickupTime) {
      date = (pickupTime as Timestamp).toDate();
    } 
    // Handle ISO string or other formats
    else {
      date = new Date(pickupTime);
    }
  
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }
  
  
  async loadTicket(ticketId: string): Promise<void> {
    try {
      const ticket = await this.ticketService.getTicketByDocId(ticketId);
      if (ticket) {
         this.fetchTotalPrice();
        this.ticket = ticket;
       
     
      }
    } catch (err) {
      console.error('Error loading ticket:', err);
      alert('Failed to load ticket data.');
    }
  }

  getPaxTotal(pax: any): number {
    return pax?.total ?? 0;
  }
}
