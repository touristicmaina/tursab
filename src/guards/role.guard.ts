// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../app/services/auth.service';
import { UserRole } from '../app/models/user-role.enum';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const requiredRoles: UserRole[] = route.data['roles'];
    return this.auth.user$.pipe(
      map(user => {
        if (user && requiredRoles.includes(user.role)) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
