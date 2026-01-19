import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

// CoreUI components
import {
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarBrandComponent,
  SidebarNavComponent,
  SidebarFooterComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  ContainerComponent,
  ShadowOnScrollDirective,
} from '@coreui/angular';

// ✅ استيراد صحيح للـ scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// Header
import { DefaultHeaderComponent } from './default-header.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,

    // CoreUI
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    ShadowOnScrollDirective,

    // Header
    DefaultHeaderComponent,

    // ✅ module فقط
    NgScrollbarModule,
  ],
})
export class DefaultLayoutComponent {}
