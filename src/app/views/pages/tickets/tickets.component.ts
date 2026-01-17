import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  // ✅ هذا هو الحل — تعريف formValue
  formValue = {
    restAmount: 0
  };

  constructor() {}

  ngOnInit(): void {
    // إذا بدك قيمة افتراضية
    this.formValue.restAmount = 0;
  }

}
