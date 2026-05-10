import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";


@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    LoaderComponent,
    SlicePipe,
    ElapsedTimePipe
],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  car = {} as Car;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.carService.getSingleCar(id).subscribe(car => {
      this.car = car;
      this.isLoading = false;
      console.log(car.userId);
    });

  }
}
