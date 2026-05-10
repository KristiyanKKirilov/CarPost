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

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [LoaderComponent, FormsModule, SlicePipe, ElapsedTimePipe],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit {
  car = {} as Car;
  isLoading = true;

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
      console.log(car.userId);
    });

  }

  editCar(form: NgForm): void {
      if(form.invalid){
        return;
      }

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
        .subscribe(() =>{
          this.router.navigate([`/cars/${this.car._id}`]);
        });
  }


}
