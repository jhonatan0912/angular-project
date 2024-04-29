import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Person } from '@core/models';
import { UserService } from '@core/services';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-dashboard.component.html',
})
export class NavbarDashboardComponent implements OnInit {
  onToggle: boolean = false;
  onSubMenu: boolean = false;
  currentClient: Person = new Person();
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getProfile().subscribe({
      next: (response: any) => {
        this.currentClient = response.searchUser;
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      },
    });
  }

  toggle() {
    this.onToggle = !this.onToggle;
  }

  toggleMenu() {
    this.onSubMenu = !this.onSubMenu;
  }
}
