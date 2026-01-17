import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 👇 هذا الاستيراد الناقص
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WidgetsDropdownComponent // 👈 مهم جداً
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {}
