import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarDashboardComponent } from '../../shared/components/navbar-dashboard/navbar-dashboard.component';
import { WarehouseService } from '../../core/services/warehouse.service';
import { throwError } from 'rxjs';
import { IStorageStock } from '../../core/models/storage.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-storer-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarDashboardComponent, PaginationComponent, FormsModule, ReactiveFormsModule, FilterPipe, CapitalizePipe, ModalComponent, TableComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  /* Paginacion de la tabla */
  rows!: IStorageStock[];
  pageSize: number = 7;
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;

  /* Busqueda en la tabla */
  filterText: string = '';


  /* Modal */
  modalTitle: string = 'Crear un nuevo articulo';
  onSwitch = false;

  /* Formulario */
  createArticleForm!: FormGroup;
  toastVisible: boolean = false;
  loading: boolean = false;

  @ViewChild('myModal') myModal!: ModalComponent;
  @ViewChild('fileInput') fileInput: ElementRef<any> | null = null;

  constructor(private readonly warehouseService: WarehouseService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadData();

    this.createArticleForm = this.formBuilder.group({
      description: ['', Validators.required],
      imagen: [null, Validators.required],
    });
  }

  openModal() {
    this.myModal.toggle(true);
  }

  toggleChange(switchValue: boolean) {
    this.onSwitch = switchValue;
  }

  loadData(): void {
    this.loading = true;
    this.warehouseService.getArticles(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        if (response && response.items) {
          this.rows = response.items;
          this.totalItems = response.total || response.items.length;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);

          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      error: () => {
        throwError(() => Error('No se puede obtener los datos'));
      },
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadData();
  }

  createArticle() {
    this.loading = true;

    if (this.createArticleForm.valid) {
      const formData = new FormData();
      formData.append('description', this.createArticleForm.get('description')?.value);
      const imageFile = this.createArticleForm.get('imagen')?.value;
      formData.append('imagen', imageFile);

      this.warehouseService.createArticle(formData).subscribe({
        next: () => {
          this.toastVisible = true;

          this.createArticleForm.reset();
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
          }

          setTimeout(() => {
            this.toastVisible = false;
          }, 3000);

          this.loading = false;
        },
        error: (error) => {
          console.error('Error al crear el artículo:', error);
        },
      });
    } else {
      console.log('El formulario no es válido');
    }
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      this.createArticleForm.patchValue({ imagen: file });
    }
  }
}
