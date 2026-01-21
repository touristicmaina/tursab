import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {}
