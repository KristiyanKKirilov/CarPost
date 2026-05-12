import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlicePipe } from "../../shared/pipes/slice.pipe";
import { ElapsedTimePipe } from "../../shared/pipes/elapsed-time.pipe";
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [LoaderComponent, FormsModule, SlicePipe, ElapsedTimePipe, CommonModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit {
  car = {} as Car;
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  isOwner = false;

   get user(): User | null {
      return this.userService.user || null;
    }

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.carService.getSingleCar(id).subscribe(car => {
      this.car = car;
      this.isLoading = false;
      
      // Check if current user is the owner
      if (this.userService.user && this.car.userId) {
        this.isOwner = this.userService.user._id === this.car.userId._id;
        
        // Redirect if user is not owner
        if (!this.isOwner) {
          alert('You are not authorized to edit this car');
          this.router.navigate([`/cars/${this.car._id}`]);
        }
      }
      console.log(car.userId);
    });

  }

  editCar(form: NgForm): void {
      if(form.invalid){
        return;
      }

      this.isSaving = true;
      this.errorMessage = '';
      const {
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
        firstImageUrl,
        secondImageUrl        
      } = form.value;
      
      this.carService.updateCar( 
        this.car._id,
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
        firstImageUrl,
        secondImageUrl)
        .subscribe({
          next: () =>{
            this.isSaving = false;
            alert('Car updated successfully');
            this.router.navigate([`/cars/${this.car._id}`]);
          },
          error: (err) => {
            this.isSaving = false;
            this.errorMessage = err.error?.message || 'Failed to update car. Please try again.';
            console.error('Update error:', err);
          }
        });
  }


}
