import { Routes } from '@angular/router';
import { tokenGuard } from './core/guards/token.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.auth_routes),
  },

  {
    path: 'admin/dashboard',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.admin_routes),
    canActivate: [tokenGuard],
    data: { allowedRoles: [1] },
  },

  {
    path: 'storer/dashboard',
    loadChildren: () => import('./storer/storer.routes').then((m) => m.storer_routes),
    canActivate: [tokenGuard],
    data: { allowedRoles: [2] },
  },

  {
    path: 'member/dashboard',
    loadChildren: () => import('./member/member.routes').then((m) => m.member_routes),
    canActivate: [tokenGuard],
    data: { allowedRoles: [3] },
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
