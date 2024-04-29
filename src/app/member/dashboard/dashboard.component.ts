import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '../../shared/components/navbar-dashboard/navbar-dashboard.component';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarDashboardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
