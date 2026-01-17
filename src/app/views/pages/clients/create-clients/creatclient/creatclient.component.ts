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

  // ====== REQUIRED PROPERTIES ======
  selectedIsActive: string | null = null;
  mode: 'create' | 'edit' = 'create';

  // ====== REQUIRED METHOD ======
  selectIsActive(value: string) {
    this.selectedIsActive = value;
  }

}
