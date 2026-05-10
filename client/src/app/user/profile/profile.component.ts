import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../../car/car.service';
import { Car } from '../../types/car';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  cars: Car[] = [];
  carIds: string[] | undefined = [];
  isLoading: boolean = true;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get user(): User | null {
    return this.userService.user || null;
  }


  constructor(
    private userService: UserService,
    private carService: CarService,
    private router: Router) { }
  ngOnInit(): void {
    this.userService
      .getUserCars(this.user?._id!)
      .subscribe(cars => {
        this.cars = cars;
        console.log(cars);
        this.isLoading = false;
      })

  }

  deleteCar(_id: string): void {
    this.carService
      .deleteCar(_id)
      .subscribe(() => {
        this.router.navigate(['/cars']);
      })
  }


}
