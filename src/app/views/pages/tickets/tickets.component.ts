import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent implements OnInit {

  // ✅ هذا هو المتغير الناقص
  formValue = {
    restAmount: 0
  };

  constructor() {}

  ngOnInit(): void {}
}
