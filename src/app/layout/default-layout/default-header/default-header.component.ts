import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  BreadcrumbRouterComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';

import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { AppUser } from '../../../models/user.model';

@Component({
  selector: 'app-default-header',
  standalone: true, // ✅ مهم جدًا
  templateUrl: './default-header.component.html',
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    HeaderNavComponent,

    RouterLink,
    NgTemplateOutlet,

    BreadcrumbRouterComponent,

    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownDividerDirective,
    DropdownItemDirective,

    IconDirective,
  ],
})
export class DefaultHeaderComponent extends HeaderComponent {

  user: AppUser | null = null;

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(m => m.name === currentMode)?.icon ?? 'cilSun';
  });

  sidebarId = input('sidebar1');

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(user => {
      this.user = user;
    });
  }

  onLogout(): void {
    this.auth.logout().subscribe(() => {
      localStorage.removeItem('loginTime');
      window.indexedDB.deleteDatabase('firebaseLocalStorageDb');
      this.router.navigate(['/login']);
    });
  }
}
