import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Car } from '../../types/car';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Brand } from '../../types/brand';

@Component({
  selector: 'app-current-brand',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './current-brand.component.html',
  styleUrl: './current-brand.component.css'
})
export class CurrentBrandComponent implements OnInit {
  cars: Car[] = [];
  brand: Brand | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.brandService.getAllCarsWithCurrentBrand(id)
    .subscribe(cars => {
      console.log(cars);
      this.cars = cars;
      this.isLoading = false;
    });    
  }


}
