import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// CoreUI
import {
  ButtonModule,
  GridModule,
  DropdownModule
} from '@coreui/angular';

@Component({
  selector: 'app-creatclient',
  standalone: true,
  templateUrl: './creatclient.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    GridModule,
    DropdownModule
  ]
})
export class CreatclientComponent {

  // ===== STATUS =====
  selectedIsActive: string | null = null;

  selectIsActive(value: string) {
    this.selectedIsActive = value;
  }

  // ===== CURRENCY =====
  selectedCurrency: string = 'Select Currency';

  selectCurrency(currency: string) {
    this.selectedCurrency = currency;
  }

  // ===== MODE =====
  mode: 'create' | 'edit' = 'create';

}
