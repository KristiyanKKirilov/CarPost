import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../../types/car';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-all-cars',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './all-cars.component.html',
  styleUrl: './all-cars.component.css'
})
export class AllCarsComponent implements OnInit{
  cars: Car[] = [];
  isLoading:boolean = true;

  constructor(private carService: CarService){}

  ngOnInit(): void {
    this.carService
    .getAllCars()
    .subscribe((cars) => {
      this.cars = cars;
      this.isLoading = false;
      console.log(cars);
      console.log(this.cars);
    })
  }

  

}
