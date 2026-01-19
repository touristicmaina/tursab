import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const loginTime = localStorage.getItem('loginTime');

  if (loginTime) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
