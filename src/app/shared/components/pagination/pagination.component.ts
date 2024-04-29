import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 7;
  @Input() totalItems: number = 0;
  @Input() totalPages: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  onPageChange(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
}
