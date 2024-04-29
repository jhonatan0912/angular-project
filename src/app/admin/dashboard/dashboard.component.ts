import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarDashboardComponent } from '@shared/components';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarDashboardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent { }
