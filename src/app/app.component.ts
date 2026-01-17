import {
  Component,
  OnInit,
  inject,
  DestroyRef
} from '@angular/core';

import {
  RouterOutlet,
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private auth       = inject(AuthService);
  private router     = inject(Router);
  private titleSvc   = inject(Title);
  private route      = inject(ActivatedRoute);
  private colorSvc   = inject(ColorModeService);
  private icons      = inject(IconSetService);

  title = 'Touristic Mania';

  constructor() {
    // document title
    this.titleSvc.setTitle(this.title);

    // CoreUI icons + theme
    this.icons.icons = { ...iconSubset };
    this.colorSvc.localStorageItemName.set(
      'coreui-free-angular-admin-template-theme-default'
    );
    this.colorSvc.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    // Router events
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        if (evt instanceof NavigationEnd) {
          // optional logic
        }
      });

    // Theme via query param ?theme=dark|light|auto
    this.route.queryParams
      .pipe(
        delay(1),
        map(p => <string>p['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(t => ['dark', 'light', 'auto'].includes(t)),
        tap(t => this.colorSvc.colorMode.set(t)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    // Watch login state
    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        if (user) {
          this.scheduleExpiry();
        }
      });
  }

  /** manual logout */
  async logout(): Promise<void> {
    await this.clearSession();
    this.router.navigate(['/login']);
  }

  /** auto logout after 1 hour */
  private scheduleExpiry(): void {
    const loginTime = Number(localStorage.getItem('loginTime') || 0);
    const elapsed   = Date.now() - loginTime;
    const remaining = 3600_000 - elapsed;

    if (remaining <= 0) {
      this.expireSession();
    } else {
      setTimeout(() => this.expireSession(), remaining);
    }
  }

  private async expireSession(): Promise<void> {
    alert('Session expired. Please log in again.');
    await this.clearSession();
    this.router.navigate(['/login']);
  }

  /** clear auth + storage */
  private async clearSession(): Promise<void> {

    // Firebase sign out
    await firstValueFrom(this.auth.logout());

    // clear timestamp
    localStorage.removeItem('loginTime');

    // clear firebase indexedDB
    await new Promise<void>(resolve => {
      const req = indexedDB.deleteDatabase('firebaseLocalStorageDb');
      req.onsuccess = () => resolve();
      req.onerror   = () => resolve();
      req.onblocked = () => resolve();
    });
  }
}
