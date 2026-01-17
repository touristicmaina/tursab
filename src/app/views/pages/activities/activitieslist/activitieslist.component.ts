import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-activitieslist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule   // ⬅️ لحل routerLink
  ],
  templateUrl: './activitieslist.component.html'
})
export class ActivitieslistComponent {

  services: any[] = [];

  constructor() {}

  // ✅ هذه الدالة كانت ناقصة
  confirmDelete(service: any): void {
    const ok = confirm('Are you sure you want to delete this service?');
    if (ok) {
      console.log('Delete service:', service);
      // لاحقاً تربطها مع السيرفس الحقيقي
    }
  }
}
