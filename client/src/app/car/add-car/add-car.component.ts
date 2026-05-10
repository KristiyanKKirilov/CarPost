import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CarService } from '../car.service';
import { Router } from '@angular/router';
import { BrandService } from '../../brand/brand.service';
import { Brand } from '../../types/brand';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NonNegativeDirective } from '../../directives/non-negative.directive';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    FormsModule,
    LoaderComponent,
    NonNegativeDirective,
],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit{
  isLoading: boolean = true;
  brands: Brand[] = [];
  selectedName: string = '';
  
  constructor(
    private carService: CarService, 
    private router: Router, 
    private brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService
    .getAllBrands()
    .subscribe((brands) => {
      this.brands = brands;
      this.selectedName = brands[0].name;
      this.isLoading = false;
    })
  }

  addCar(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    console.log(form.value);
    console.log(this.selectedName);
    const {
      brand,
      model,
      firstImage,
      secondImage,
      price,
      year,
      city,
      kilometers,
      gearbox,
      color,
      doors,
      horsepowers,
      engine
    } = form.value;

    this.carService.createCar(
      brand,
      model,
      price,
      year,
      city,
      kilometers,
      engine,
      color,
      gearbox,
      horsepowers,
      doors,
      firstImage,
      secondImage
    ).subscribe(() => {
          this.router.navigate(['/cars']);
    });
  }
}
