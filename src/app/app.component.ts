import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './services/auth.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';
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
    this.titleSvc.setTitle(this.title);

    this.icons.icons = { ...iconSubset };
    this.colorSvc.localStorageItemName.set(
      'coreui-free-angular-admin-template-theme-default'
    );
    this.colorSvc.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        if (evt instanceof NavigationEnd) {}
      });

    this.route.queryParams
      .pipe(
        delay(1),
        map(p => p['theme']),
        filter(t => t === 'dark' || t === 'light' || t === 'auto'),
        tap(t => this.colorSvc.colorMode.set(t)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        if (user) {
          this.scheduleExpiry();
        }
      });
  }

  logout(): void {
    this.clearSession().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private scheduleExpiry(): void {
    const loginTime = Number(localStorage.getItem('loginTime'));
    if (!loginTime) return;

    const elapsed = Date.now() - loginTime;
    const remaining = 3600000 - elapsed;

    if (remaining <= 0) {
      this.expireSession();
    } else {
      setTimeout(() => this.expireSession(), remaining);
    }
  }

  private expireSession(): void {
    alert('Session expired. Please log in again.');
    this.clearSession().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private async clearSession(): Promise<void> {
    await this.auth.logout();

    localStorage.removeItem('loginTime');

    await new Promise<void>(resolve => {
      const req = indexedDB.deleteDatabase('firebaseLocalStorageDb');
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
      req.onblocked = () => resolve();
    });
  }
}
