import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticketview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketview.component.html'
})
export class TicketviewComponent {

  ticket: any = null;

}
