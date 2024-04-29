import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const storer_routes: Routes = [
  {
    path: 'home',
    loadComponent: () => DashboardComponent,
  },
];
