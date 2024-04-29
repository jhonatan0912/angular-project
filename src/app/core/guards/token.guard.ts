import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userRol = authService.getRolUser() || [];

  if (!userRol) {
    authService.redirectRol(userRol);
    return false;
  }

  const allowedRoles = route.data?.['allowedRoles'] || []; // Buscar roles permitidos en los datos de la ruta
  return allowedRoles.length === 0 || allowedRoles.includes(userRol);
};
