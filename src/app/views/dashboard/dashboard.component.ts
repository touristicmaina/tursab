import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  clientsCount = 0;

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data: any[]) => {
      this.clientsCount = data.length;
    });
  }
}
