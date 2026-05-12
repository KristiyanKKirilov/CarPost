import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface FilterCriteria {
  model: string;
  yearFrom: string;
  yearTo: string;
  priceMin: number | null;
  priceMax: number | null;
  engine: string;
  gearbox: string;
}

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent implements OnInit {
  @Input() brandId: string = '';
  @Output() filterApplied = new EventEmitter<FilterCriteria>();
  @Output() dialogClosed = new EventEmitter<void>();

  models: string[] = [];
  isLoadingModels = false;

  filterCriteria: FilterCriteria = {
    model: '',
    yearFrom: '',
    yearTo: '',
    priceMin: null,
    priceMax: null,
    engine: '',
    gearbox: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.brandId) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.isLoadingModels = true;
    this.http.get<string[]>(`/api/brands/${this.brandId}/models`)
      .subscribe({
        next: (models) => {
          this.models = models.sort();
          this.isLoadingModels = false;
        },
        error: (error) => {
          console.error('Error loading models:', error);
          this.isLoadingModels = false;
        }
      });
  }

  applyFilter(): void {
    this.filterApplied.emit(this.filterCriteria);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogClosed.emit();
  }

  resetFilter(): void {
    this.filterCriteria = {
      model: '',
      yearFrom: '',
      yearTo: '',
      priceMin: null,
      priceMax: null,
      engine: '',
      gearbox: ''
    };
  }
}
