import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() switch = false;
  @Output() newOnToggle = new EventEmitter<boolean>();

  isClosed() {
    this.switch = false;
  }

  toggle(value: boolean) {
    this.switch = value;
    this.newOnToggle.emit(value);
  }
}
