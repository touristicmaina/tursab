import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientslist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule   // ✅ هذا هو الحل
  ],
  templateUrl: './clientslist.component.html',
  styleUrls: ['./clientslist.component.scss']
})
export class ClientslistComponent {

  client = {
    name: '',
    phone: '',
    pax: 1,
    hotel: '',
    guideName: '',
    guidePhone: ''
  };

  save() {
    console.log(this.client);
  }
}
