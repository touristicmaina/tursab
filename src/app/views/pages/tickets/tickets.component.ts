import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {}
