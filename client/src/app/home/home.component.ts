import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../shared/loader/loader.component';
import { CarService } from '../car/car.service';
import { Car } from '../types/car';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoaderComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  isLoading: boolean = true;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getLatestCars()
      .subscribe(cars => {
        this.cars = cars;
        this.isLoading = false;
      })

  }

}
