// src/app/app.component.ts
import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './services/auth.service';
import { Title }       from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
import { ColorModeService } from '@coreui/angular';
import { IconSetService }   from '@coreui/icons-angular';
import { iconSubset }       from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
    // set the document title
    this.titleSvc.setTitle(this.title);

    // CoreUI icon + theme init
    this.icons.icons = { ...iconSubset };
    this.colorSvc.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.colorSvc.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    // 1) existing theme switch and navigation logic
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        if (evt instanceof NavigationEnd) {
          // (you can do extra work here on each NavigationEnd)
        }
      });

    this.route.queryParams
      .pipe(
        delay(1),
        map(p => <string>p['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(t => ['dark', 'light', 'auto'].includes(t)),
        tap(t => this.colorSvc.colorMode.set(t)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    // 2) watch login/logout and schedule expiry
    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        if (user) {
          this.scheduleExpiry();
        }
      });
  }

  /** manual logout (you can call this from a button in your layout) */
  logout(): void {
    this.clearSession()
      .then(() => this.router.navigate(['/login']));
  }

  /** schedule auto-logout at 1hr after login */
  private scheduleExpiry(): void {
    const loginTime = parseInt(localStorage.getItem('loginTime') || '0', 10);
    const elapsed   = Date.now() - loginTime;
    const remaining = 3600_000 - elapsed;

    if (remaining <= 0) {
      this.expireSession();
    } else {
      setTimeout(() => this.expireSession(), remaining);
    }
  }

  /** sign out + clear storage/indexedDB + timestamp */
  private expireSession(): void {
    alert('Session expired. Please log in again.');
    this.clearSession()
      .then(() => this.router.navigate(['/login']));
  }

  /** helper to perform sign-out and clear state */
  private async clearSession(): Promise<void> {
    // 1) Firebase signOut
    await this.auth.logout().toPromise();

    // 2) remove our login timestamp
    localStorage.removeItem('loginTime');

    // 3) clear Firebase IndexedDB persistence
    await new Promise<void>(res => {
      const DB_DELETE_REQUEST = window.indexedDB.deleteDatabase('firebaseLocalStorageDb');
      DB_DELETE_REQUEST.onsuccess = () => res();
      DB_DELETE_REQUEST.onerror   = () => res();
      DB_DELETE_REQUEST.onblocked = () => res();
    });
  }
}
