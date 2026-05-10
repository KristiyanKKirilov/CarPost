import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../../types/brand';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-all-brands',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.css'
})
export class AllBrandsComponent implements OnInit{
  brands = {} as Brand[];
  isLoading = true;
  
  constructor(private brandService: BrandService){}

  ngOnInit(): void {
    this.brandService.getAllBrands()
    .subscribe((brands) => {
      this.brands = brands;
      this.isLoading = false;
    })
  }


}
