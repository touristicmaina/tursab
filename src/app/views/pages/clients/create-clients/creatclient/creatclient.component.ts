import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ClientService } from '../../../../../services/clients.service';
import {  NewClientData } from '../../../../../models/client.model';
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

@Component({
  selector: 'app-creatclient',
  standalone: true,
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
  ],
  templateUrl: './creatclient.component.html',
  styleUrl: './creatclient.component.scss',
})
export class CreatclientComponent implements OnInit {
  clientForm: FormGroup;
  selectedCurrency = 'Currency';
  selectedIsActive= '';
  mode: 'create' | 'edit' = 'create';
  clientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      hotel: ['', Validators.required],
      roomNumber: [null, Validators.required],
      adults: [0, Validators.required],
      children: [0, Validators.required],
      babies: [0, Validators.required],
      totalPrice: [0],
      deposit: [null],
      balance: [''],
      currency: [''],
      isActive: [''],
    });
  }

  ngOnInit(): void {
     // Check if there's a route parameter (Subscriber ID)
     this.route.paramMap.subscribe((params) => {
      this.clientId = params.get('id');
      console.log('Loaded clientId from route:', this.clientId); 
      if (this.clientId) {
        this.mode = 'edit'; // Set mode to 'edit' if SubscriberId exists
        this.loadClient(this.clientId); // Load Subscribers data for editing
      }
    });
  }

  async loadClient(clientId: string): Promise<void> {
    try {
      const client = await this.clientService.getClientById(clientId);
      if (client) {
        this.clientId = client.id; // <== Set actual Firestore doc ID
        this.clientForm.patchValue({
          name: client.name || '',
          email: client.email || '',
          phone: client.phone || '',
          hotel: client.hotel || '',
          roomNumber: client.roomNumber || null,
          adults: client.pax?.adults ?? 0,
          children: client.pax?.children ?? 0,
          babies: client.pax?.babies ?? 0,
          deposit: client.deposit || null,
          currency: client.currency || '',
          isActive: client.isActive || '',
        });
        this.selectedCurrency = client.currency || 'Currency';
        this.selectedIsActive = client.isActive || 'No';
      }
    } catch (err) {
      console.error('Error loading client:', err);
      alert('Failed to load client data.');
    }
  }
  
  selectCurrency(currency: string): void {
    this.selectedCurrency = currency;
    this.clientForm.get('currency')?.setValue(currency);
  }

    // Method to handle the selection of the 'Active' dropdown
    selectIsActive(isActive: string): void {
      this.selectedIsActive = isActive;
      this.clientForm.get('isActive')?.setValue(isActive);  // Set form control value
    }
  

  async onSubmit(): Promise<void> {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const formValue = this.clientForm.value;
    const client: NewClientData = {
      ...formValue,
      pax: {
        adults: formValue.adults ?? 0,
        children: formValue.children ?? 0,
        babies: formValue.babies ?? 0,
      },
  
    };

    try {
      if (this.mode === 'edit' && this.clientId) {
        console.log('Updating client with ID:', this.clientId);
        console.log('Submitting form data:', client); 
        await this.clientService.updateClient(this.clientId, client);
        console.log('Client updated:', client);
        alert('Client updated successfully');
      } else {
        await this.clientService.addClient(client);
        alert('Client added successfully');
      
      }

      this.router.navigate(['/dashboard/clients/clients-list']);
    } catch (error) {
      console.error('Error during submit:', error); 
      alert('Operation failed.');
    }
  }

  get totalPax(): number {
    const adults = this.clientForm.get('adults')?.value || 0;
    const children = this.clientForm.get('children')?.value || 0;
    const babies = this.clientForm.get('babies')?.value || 0;
    return adults + children + babies;
  }
}
