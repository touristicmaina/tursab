import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {

  formValue = {
    restAmount: 0
  };

}
