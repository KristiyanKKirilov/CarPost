import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Car } from '../../types/car';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Brand } from '../../types/brand';
import { FilterDialogComponent, FilterCriteria } from './filter-dialog/filter-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-brand',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent,
    FilterDialogComponent,
    CommonModule
  ],
  templateUrl: './current-brand.component.html',
  styleUrl: './current-brand.component.css'
})
export class CurrentBrandComponent implements OnInit {
  cars: Car[] = [];
  allCars: Car[] = [];
  brand: Brand | null = null;
  isLoading = true;
  showFilterDialog = false;
  brandId: string = '';

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.brandId = id;
    this.brandService.getAllCarsWithCurrentBrand(id)
    .subscribe(cars => {
      console.log(cars);
      this.allCars = cars;
      this.cars = cars;
      this.isLoading = false;
    });    
  }

  openFilterDialog(): void {
    this.showFilterDialog = true;
  }

  closeFilterDialog(): void {
    this.showFilterDialog = false;
  }

  applyFilter(filterCriteria: FilterCriteria): void {
    this.cars = this.allCars.filter(car => {
      // Filter by model
      if (filterCriteria.model && car.model !== filterCriteria.model) {
        return false;
      }

      // Filter by year range
      if (filterCriteria.yearFrom && parseInt(car.year) < parseInt(filterCriteria.yearFrom)) {
        return false;
      }
      if (filterCriteria.yearTo && parseInt(car.year) > parseInt(filterCriteria.yearTo)) {
        return false;
      }

      // Filter by price range
      if (filterCriteria.priceMin !== null && car.price < filterCriteria.priceMin) {
        return false;
      }
      if (filterCriteria.priceMax !== null && car.price > filterCriteria.priceMax) {
        return false;
      }

      // Filter by engine
      if (filterCriteria.engine && !car.engine.toLowerCase().includes(filterCriteria.engine.toLowerCase())) {
        return false;
      }

      // Filter by gearbox
      if (filterCriteria.gearbox && !car.gearbox.toLowerCase().includes(filterCriteria.gearbox.toLowerCase())) {
        return false;
      }

      return true;
    });

    this.showFilterDialog = false;
  }
}
