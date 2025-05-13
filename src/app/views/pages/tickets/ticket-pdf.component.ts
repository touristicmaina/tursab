import {
  Component, Input, AfterViewInit, ViewChild, ElementRef,
  ChangeDetectorRef, SimpleChanges, OnChanges
} from '@angular/core';
import { Ticket } from '../../../models/ticket.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as QRCode from 'qrcode';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { TicketServices } from '../../../services/ticket.service';
import { Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-ticket-pdf',
  templateUrl: './ticket-pdf.component.html',
  styleUrls: ['./ticket-pdf.component.scss']
})
export class TicketPdfComponent implements AfterViewInit, OnChanges {
  @Input() ticket!: Ticket;
  @ViewChild('qrCodeCanvas', { static: false }) qrCodeCanvas!: ElementRef;
  ticketDocId!: string;  // Store the Firestore document ID
  totalPrice: number=0;
  private viewInitialized = false;

  constructor(private cdr: ChangeDetectorRef, private ticketService: TicketServices) {}

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.tryGenerateQRCode();  // Make sure QR code generation happens after the view is initialized
    this.fetchTicketDoc();
    this.fetchTotalPrice(); // Fetch total price when the view is initialized
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered');
    if (changes['ticket'] && this.ticket) {
      console.log('Ticket:', this.ticket);
      console.log('Ticket ID:', this.ticket.ticketId);
      this.fetchTicketDoc();  // Fetch the document ID when ticket changes
    }
  }
  
  private async fetchTicketDoc(): Promise<void> {
    const docId = await this.ticketService.fetchTicketDocId(this.ticket);
    if (docId) {
      this.ticketDocId = docId;
      this.tryGenerateQRCode();
    }
  }

  private async fetchTotalPrice(): Promise<void> {
   const clientId = this.ticket?.client?.clientId;
   const totalPrice=await this.ticketService.getTotalPrice(clientId);
    if (totalPrice) {
      this.totalPrice = totalPrice;
    } else {
      console.error('Total price not found for client ID:', clientId);
    }

  }
  
  private tryGenerateQRCode(): void {
    if (!this.ticketDocId) {
      console.warn('No ticketDocId provided for QR code generation.');
      return;
    }
  
    const baseUrl = window.location.origin;
    const qrData = `${baseUrl}/#/tickets-view/${this.ticketDocId}`;
    console.log('Generating QR for route:', qrData);
  
    if (this.viewInitialized && this.qrCodeCanvas?.nativeElement) {
      QRCode.toCanvas(this.qrCodeCanvas.nativeElement, qrData, (error: any) => {
        if (error) {
          console.error('QR Code generation failed:', error);
        } else {
          this.cdr.detectChanges();
          console.log('QR code generated successfully.');
        }
      });
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
      hour12: false
    }).format(date);
  }
  

  getPaxTotal(pax: any): number {
    return pax?.total ?? 0;
  }

  downloadPDF() {
    const pdf = new jsPDF();
    const downloadButton = document.querySelector('.ticket__footer button') as HTMLElement;
    if (downloadButton) downloadButton.style.display = 'none';

    const content = document.querySelector('.voucher-ticket') as HTMLElement;
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ticket-${this.ticket.ticketId}.pdf`);
      if (downloadButton) downloadButton.style.display = 'block';
    }).catch((error) => {
      console.error('Error capturing content for PDF:', error);
      if (downloadButton) downloadButton.style.display = 'block';
    });
  }
}
