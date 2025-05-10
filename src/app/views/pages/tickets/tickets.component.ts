import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import {
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  ColComponent,
  FormControlDirective,
  FormLabelDirective,
  ButtonDirective,
  DropdownComponent,

  
  
} from '@coreui/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ServicesListService } from '../../../services/serviceslist.service';
import { ActivityModel } from '../../../models/activities.model';
import Swal from 'sweetalert2';
import { ClientService } from '../../../services/clients.service';
import { Client } from '../../../models/client.model';
import { Ticket } from '../../../models/ticket.model';
import { TicketServices } from '../../../services/ticket.service';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-tickets',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ColComponent,
    FormControlDirective,
    FormLabelDirective,
    ButtonDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    MatFormFieldModule,
    MatInputModule,
   MatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule,
    ColComponent,
    ButtonDirective,
    BsDatepickerModule

  ],
  providers: [provideNativeDateAdapter()],
  
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  ticketForm: FormGroup;
  selectedCurrency = 'Currency';
  mode: 'create' | 'edit' = 'create';
  ticketId: string | null = null;
  showForm = false;
  services: ActivityModel[] = [];
  clients: Client[] = [];
  searchControl = new FormControl('');


 
  constructor(
    private fb: FormBuilder,
    private ticketService: TicketServices,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesListService,
    private clientsServices: ClientService,
  ) {
    this.ticketForm = this.fb.group({
      activity: [null, Validators.required], 
      client: [null, Validators.required],   
      salePrice: [''],
      commissionRate: [0],
      commissionAmount: [0, Validators.required],
      costPriceAdult: [0, Validators.required],
      costPriceChild: [0, Validators.required],
      costPriceBaby: [0],
      costPriceTotal: [0],
      pickupPoint: ['', Validators.required], 
      date: [null, Validators.required],       
      pickupTime: ['', Validators.required], 
      isActive: [true, Validators.required],
      currency: [''],

    });    
    this.getAllServices();
    this.getAllClients();
}

toggleForm() {
  this.showForm = !this.showForm;
}


 async onSubmit(): Promise<void> {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const formValue = this.ticketForm.value;
    const selectedDate: Date = formValue.date;
   const pickupTime: string = formValue.pickupTime;
   // Format the date as "DD/MM/YYYY"
  const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

  // Get the weekday name
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = weekdays[selectedDate.getDay()];
    const ticket: Ticket = {
      ...formValue,
      Date : formattedDate,
      day: dayName,
      costPriceTotal: this.totalPrice,
      commissionAmount: this.commissionAmount,
    };

    try {
      if (this.mode === 'edit' && this.ticketId) {
        await this.ticketService.updateTickets(this.ticketId, ticket);
        alert('Ticket updated successfully');
      } else {
        await this.ticketService.addTicket(ticket);

        alert('Ticket added successfully');
      }

      this.router.navigate(['/dashboard/tickets-list']);
    } catch (error) {
      console.error(error);
      alert('Operation failed.');
    }
  }
selectCurrency(currency: string): void {
  this.selectedCurrency = currency;
  this.ticketForm.get('currency')?.setValue(currency);
}

getAllServices() {
  this.servicesService.getAllServices().subscribe({
    next: (data) => {
      // Filter services where isActive is true
      this.services = data.filter(service => service.isActive === "Yes");
    },
    error: (err) => {
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


   getAllClients() {
      this.clientsServices.getClients().subscribe({
        next: (data) => {
          this.clients = data.filter(client => client.isActive === "Yes"); 
        },
        error: (err) => {
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
  
    get commissionAmount(): number {
      const commissionRate = this.ticketForm.get('commissionRate')?.value || 0;
      const totalPrice = this.totalPrice;
      const commissionAmount = (totalPrice * commissionRate) / 100;
      return commissionAmount;
    }
    get totalPrice(): number {
      const costPriceAdult = this.ticketForm.get('costPriceAdult')?.value || 0;
      const costPriceChild = this.ticketForm.get('costPriceChild')?.value || 0;
      const costPriceBaby = this.ticketForm.get('costPriceBaby')?.value || 0;
      const totalPrice = costPriceAdult + costPriceChild + costPriceBaby;
      return totalPrice;
    }
  
}
