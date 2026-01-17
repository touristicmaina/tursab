import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule   // 👈 ضروري لـ ngModel
  ],
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {

  // 👇 لازم يكون موجود لأنو مستخدم بالـ HTML
  formValue = {
    restAmount: 0
  };

}
