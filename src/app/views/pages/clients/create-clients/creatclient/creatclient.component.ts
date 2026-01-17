import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

/**
 * إذا كنت مستخدم CoreUI (c-col, c-dropdown...)
 * لازم نسمح بالكستوم elements
 */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-creatclient',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './creatclient.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreatclientComponent implements OnInit {

  // ====== FORM ======
  clientForm!: FormGroup;

  // ====== UI STATE ======
  mode: 'add' | 'edit' = 'add';

  selectedCurrency: string = 'USD';
  selectedIsActive: string = 'Yes';

  totalPax = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      hotel: [''],
      roomNumber: [null],

      adults: [0],
      children: [0],
      babies: [0],

      totalPrice: [0],
      deposit: [0],

      currency: [this.selectedCurrency],
      isActive: [this.selectedIsActive],
    });

    // حساب pax تلقائي
    this.clientForm.valueChanges.subscribe(val => {
      const adults = Number(val.adults || 0);
      const children = Number(val.children || 0);
      const babies = Number(val.babies || 0);
      this.totalPax = adults + children + babies;
    });
  }

  // ====== DROPDOWNS ======
  selectCurrency(currency: string) {
    this.selectedCurrency = currency;
    this.clientForm.patchValue({ currency });
  }

  selectIsActive(status: string) {
    this.selectedIsActive = status;
    this.clientForm.patchValue({ isActive: status });
  }

  // ====== SUBMIT ======
  onSubmit() {
    if (this.clientForm.invalid) {
      return;
    }

    const payload = {
      ...this.clientForm.value,
      pax: this.totalPax,
    };

    console.log('CLIENT DATA:', payload);
  }
}
