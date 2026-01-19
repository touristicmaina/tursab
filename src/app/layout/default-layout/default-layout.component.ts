import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgScrollbar } from 'ngx-scrollbar';

import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent } from './default-footer.component';
import { DefaultHeaderComponent } from './default-header.component';
import { navItems } from './_nav';

@Component({
  selector: 'app-default-layout',
  standalone: true, // ✅ مهم جداً
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,

    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,

    ContainerComponent,
    ShadowOnScrollDirective,
    NgScrollbar,

    DefaultHeaderComponent,
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];
}
