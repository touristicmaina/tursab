// src/app/app.component.ts
import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { delay, filter, map, tap } from 'rxjs/operators';

import { AuthService } from './services/auth.service';
import { AppUser } from './models/user.model';

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
  private auth       = inject(AuthService);
  private router     = inject(Router);
  private titleSvc   = inject(Title);
  private route      = inject(ActivatedRoute);
  private colorSvc   = inject(ColorModeService);
  private icons      = inject(IconSetService);

  title = 'Touristic Mania';

  constructor() {
    // عنوان الصفحة
    this.titleSvc.setTitle(this.title);

    // CoreUI icons + theme
    this.icons.icons = { ...iconSubset };
    this.colorSvc.localStorageItemName.set(
      'coreui-free-angular-admin-template-theme-default'
    );
    this.colorSvc.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    // مراقبة التنقل (اختياري – جاهز للتوسعة)
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          // ممكن تضيف منطق إضافي هون إذا حبيت
        }
      });

    // قراءة theme من query params
    this.route.queryParams
      .pipe(
        delay(1),
        map(params => params['theme'] as string | undefined),
        filter(theme => theme === 'dark' || theme === 'light' || theme === 'auto'),
        tap(theme => this.colorSvc.colorMode.set(theme)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    // مراقبة تسجيل الدخول / الخروج
    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: AppUser | null) => {
        if (user) {
          this.scheduleExpiry();
        }
      });
  }

  /** تسجيل خروج يدوي */
  logout(): void {
    this.clearSession().then(() => {
      this.router.navigate(['/login']);
    });
  }

  /** جدولة انتهاء الجلسة بعد ساعة */
  private scheduleExpiry(): void {
    const loginTime = Number(localStorage.getItem('loginTime') || 0);
    const elapsed   = Date.now() - loginTime;
    const remaining = 60 * 60 * 1000 - elapsed; // 1 ساعة

    if (remaining <= 0) {
      this.expireSession();
    } else {
      setTimeout(() => this.expireSession(), remaining);
    }
  }

  /** انتهاء الجلسة تلقائي */
  private expireSession(): void {
    alert('Session expired. Please log in again.');
    this.clearSession().then(() => {
      this.router.navigate(['/login']);
    });
  }

  /** تنظيف كامل للجلسة */
  private async clearSession(): Promise<void> {
    // Firebase logout
    await this.auth.logout().toPromise();

    // حذف وقت تسجيل الدخول
    localStorage.removeItem('loginTime');

    // حذف Firebase IndexedDB
    await new Promise<void>(resolve => {
      const request = indexedDB.deleteDatabase('firebaseLocalStorageDb');
      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
      request.onblocked = () => resolve();
    });
  }
}
