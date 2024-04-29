import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const admin_routes: Routes = [
  {
    path: 'home',
    loadComponent: () => DashboardComponent,
  },
];
