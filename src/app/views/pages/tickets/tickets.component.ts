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
  selectedActive = '';
  selectedBalance = '';
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
      isActive: ['', Validators.required],
      balance: ['', Validators.required],

    });    
    this.getAllServices();
    this.getAllClients();
}

toggleForm() {
  this.showForm = !this.showForm;
}


  ngOnInit(): void {
     // Check if there's a route parameter (Subscriber ID)
     this.route.paramMap.subscribe((params) => {
      this.ticketId = params.get('id');
  
      if (this.ticketId) {
        this.mode = 'edit'; // Set mode to 'edit' if SubscriberId exists
        this.loadTicket(this.ticketId); // Load Subscribers data for editing
      }
    });


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
           Swal.fire({
          title: 'Success!',
          text: 'Ticket Updated successfully',
          icon: 'success',  
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        
      } else {
        await this.ticketService.addTicket(ticket);
        Swal.fire({
          title: 'Success!',
          text: 'Ticket added successfully',
          icon: 'success',  
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        
        // alert('Ticket added successfully');
      }

      this.router.navigate(['/dashboard/tickets-list']);
    } catch (error) {
      console.error(error);
      alert('Operation failed.');
    }
  }
selectActive(active: string): void {
  this.selectedActive = active;
  this.ticketForm.get('isActive')?.setValue(active);
}

selectBalance(balance:string){
  this.selectedBalance= balance;
  this.ticketForm.get('balance')?.setValue(balance);
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

async loadTicket(ticketId: string): Promise<void> {
  try {
    const ticket = await this.ticketService.getTicketById(ticketId);
    if (ticket) {
      

      // Find matching activity and client objects from list
      const activityObj = this.services.find(service => service.activityName === ticket.activity.activityName);
      const clientObj = this.clients.find(c => c.name === ticket.client.name);

      this.ticketForm.patchValue({
        activity: activityObj || null,
        client: clientObj || null,
        salePrice: ticket.salePrice || 0,
        commissionRate: ticket.commissionRate || 0,
        costPriceAdult: ticket.costPriceAdult || 0,
        costPriceChild: ticket.costPriceChild || 0,
        costPriceBaby: ticket.costPriceBaby || 0,
        pickupPoint: ticket.pickupPoint || '',
    date: typeof ticket.Date === 'string'
  ? this.parseDate(ticket.Date)
  : ticket.Date instanceof Date
  ? ticket.Date
  : null,

      pickupTime: this.parseTimeToDate(ticket.pickupTime),

        isActive: ticket.isActive || '',
        balance: ticket.balance || ''
      });

      // Also update dropdown text display for Active and Balance
      this.selectedActive = ticket.isActive;
      this.selectedBalance = ticket.balance;
    }
  } catch (err) {
    console.error('Error loading ticket:', err);
    alert('Failed to load ticket data.');
  }
}


parseDate(dateStr: string): Date | null {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null;
}

parseTimeToDate(timeInput: any): Date | null {
  if (!timeInput) return null;

  // If already a Date
  if (timeInput instanceof Date) {
    return timeInput;
  }

  // If Firestore Timestamp object
  if (typeof timeInput === 'object' && 'seconds' in timeInput) {
    return new Date(timeInput.seconds * 1000);
  }

  // If plain "HH:mm" string
  if (typeof timeInput === 'string' && timeInput.includes(':')) {
    const [hours, minutes] = timeInput.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  console.warn('Unexpected pickupTime format:', timeInput);
  return null;
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
      const salePrice = this.ticketForm.get('salePrice')?.value || 0;
      const allPrices = salePrice-totalPrice;
      const commissionAmount = (allPrices * commissionRate) / 100;
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
