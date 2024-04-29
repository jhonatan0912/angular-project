import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  onToggle: boolean = false;

  toggle() {
    this.onToggle = !this.onToggle;
    console.log('click');
  }
}
