import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    LoaderComponent,
    SlicePipe,
    ElapsedTimePipe,
    CommonModule
],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  car = {} as Car;
  isLoading = true;
  isDeleting = false;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.carService.getSingleCar(id).subscribe(car => {
      this.car = car;
      this.isLoading = false;
      
      // Check if current user is the owner of the car
      if (this.userService.user && this.car.userId) {
        this.isOwner = this.userService.user._id === this.car.userId._id;
      }
      console.log(car.userId);
    });

  }

  deleteCar(): void {
    if (!confirm('Are you sure you want to delete this car?')) {
      return;
    }

    this.isDeleting = true;
    this.carService.deleteCar(this.car._id).subscribe({
      next: () => {
        this.isDeleting = false;
        alert('Car deleted successfully');
        this.router.navigate(['/cars']);
      },
      error: (err) => {
        this.isDeleting = false;
        alert('Failed to delete car: ' + (err.error?.message || 'Unknown error'));
        console.error('Delete error:', err);
      }
    });
  }

  editCar(): void {
    this.router.navigate(['/edit', this.car._id]);
  }
}
