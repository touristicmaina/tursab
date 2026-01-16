import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticketForm!: FormGroup;

  services: any[] = [];
  clients: any[] = [];

  mode: 'add' | 'edit' = 'add';

  selectedActive: 'Yes' | 'No' = 'Yes';
  selectedBalance: 'paid' | 'unpaid' = 'paid';

  commissionAmount = 0;
  totalPrice = 0;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
    this.listenCalculations();
  }

  // ------------------------
  // FORM
  // ------------------------
  buildForm(): void {
    this.ticketForm = this.fb.group({
      activity: [null, Validators.required],
      client: [null, Validators.required],

      salePrice: [0, Validators.required],
      commissionRate: [0],

      costPriceAdult: [0],
      costPriceChild: [0],
      costPriceBaby: [0],

      date: [null, Validators.required],
      pickupTime: ['', Validators.required],
      pickupPoint: ['', Validators.required]
    });
  }

  // ------------------------
  // LOAD DATA  ✅ (مصلح)
  // ------------------------
  loadData(): void {

    this.ticketService.getActivities().subscribe((data: any[]) => {
      this.services = data;
    });

    this.ticketService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });

  }

  // ------------------------
  // CALCULATIONS
  // ------------------------
  listenCalculations(): void {
    this.ticketForm.valueChanges.subscribe(values => {
      const salePrice = Number(values.salePrice) || 0;
      const commissionRate = Number(values.commissionRate) || 0;

      const adult = Number(values.costPriceAdult) || 0;
      const child = Number(values.costPriceChild) || 0;
      const baby = Number(values.costPriceBaby) || 0;

      this.commissionAmount = (salePrice * commissionRate) / 100;
      this.totalPrice = adult + child + baby;
    });
  }

  // ------------------------
  // SUBMIT
  // ------------------------
  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const formValue = this.ticketForm.value;

    const ticket: Partial<Ticket> = {
      client: {
        clientId: formValue.client.id,
        name: formValue.client.name,
        phone: formValue.client.phone,
        hotel: formValue.client.hotel,
        pax: formValue.client.pax
      },

      activity: {
        activityId: formValue.activity.activityId,
        name: formValue.activity.activityName
      },

      salePrice: {
        amount: Number(formValue.salePrice),
        currency: 'USD'
      },

      paymentStatus: this.selectedBalance === 'paid' ? 'PAID' : 'REST',

      rest: this.selectedBalance === 'unpaid'
        ? { amount: this.totalPrice, currency: 'USD' }
        : undefined,

      pickupPoint: formValue.pickupPoint,
      pickupTime: formValue.pickupTime,
      activityDate: formValue.date,

      createdAt: new Date()
    };

    this.ticketService.createTicket(ticket);
  }
}
