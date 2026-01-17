// src/app/app.component.ts
import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './services/auth.service';

// CoreUI
import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private auth = inject(AuthService);
  private router = inject(Router);
  private titleSvc = inject(Title);
  private route = inject(ActivatedRoute);
  private colorSvc = inject(ColorModeService);
  private icons = inject(IconSetService);

  title = 'Touristic Mania';

  constructor() {
    // Page title
    this.titleSvc.setTitle(this.title);

    // CoreUI icons & theme
    this.icons.icons = { ...iconSubset };
    this.colorSvc.localStorageItemName.set(
      'coreui-free-angular-admin-template-theme-default'
    );
    this.colorSvc.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    // Listen router events
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          // navigation hook (optional)
        }
      });

    // Theme from query params
    this.route.queryParams
      .pipe(
        delay(1),
        map(params => params['theme']),
        filter(theme => theme === 'dark' || theme === 'light' || theme === 'auto'),
        tap(theme => this.colorSvc.colorMode.set(theme)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    // Auth state
    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        if (user) {
          this.scheduleExpiry();
        }
      });
  }

  // Manual logout
  async logout(): Promise<void> {
    await this.clearSession();
    await this.router.navigate(['/login']);
  }

  // Auto logout after 1 hour
  private scheduleExpiry(): void {
    const loginTime = Number(localStorage.getItem('loginTime') || 0);
    const elapsed = Date.now() - loginTime;
    const remaining = 3600_000 - elapsed;

    if (remaining <= 0) {
      this.expireSession();
    } else {
      setTimeout(() => this.expireSession(), remaining);
    }
_tri
  }

  private async expireSession(): Promise<void> {
    alert('Session expired. Please log in again.');
    await this.clearSession();
    await this.router.navigate(['/login']);
  }

  // Clear auth + storage
