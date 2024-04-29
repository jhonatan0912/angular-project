import { Component, Input, ViewChild } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FilterPipe, FormsModule, ModalComponent],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() filterText: string = '';
}
