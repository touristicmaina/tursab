import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = true; // عدلها لاحقاً حسب auth

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
