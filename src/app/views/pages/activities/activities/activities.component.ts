import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

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
  selector: 'app-activities',
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
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  activityForm: FormGroup;
  selectedCurrency = 'Currency';
  mode: 'create' | 'edit' = 'create';
  activityId: string | null = null;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    // private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      salePrice: [''],
      commissionRate: [0],
      commissionAmount: [0, Validators.required],
      costPriceAdult: [0, Validators.required],
      costPriceChild: [0, Validators.required],
      costPriceBaby: [0],
      costPriceTotal: [0],
      isActive: [true, Validators.required],
      currency: [''],
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  
  onSubmit() {
    if (this.activityForm.valid) {
      // Handle form submission
      console.log(this.activityForm.value);
      // You can also navigate to another page or perform other actions here
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }
  

  selectCurrency(currency: string): void {
    this.selectedCurrency = currency;
    this.activityForm.get('currency')?.setValue(currency);
  }


}