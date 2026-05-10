import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllBrandsComponent } from './brand/all-brands/all-brands.component';
import { AuthenticationComponent } from './user/authentication/authentication.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { ErrorComponent } from './error/error.component';
import { AllCarsComponent } from './car/all-cars/all-cars.component';
import { AddCarComponent } from './car/add-car/add-car.component';
import { CurrentBrandComponent } from './brand/current-brand/current-brand.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { EditCarComponent } from './car/edit-car/edit-car.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'brands', children: [
        {path: '',  component: AllBrandsComponent},
        {path: ':id', component:  CurrentBrandComponent,  canActivate: [AuthGuard]},
    ]}, 
    {path: 'cars', children: [
        {path: '', component: AllCarsComponent, canActivate: [AuthGuard]},
        {path: ':id', component: CarDetailsComponent,  canActivate: [AuthGuard]}
    ]},    
    {path: 'auth', component: AuthenticationComponent},
    {path: 'add-car', component: AddCarComponent,  canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'edit', children: [
        {path: '', component: ProfileComponent},
        {path: ':id', component: EditCarComponent},
    ]},
    {path: '404', component: ErrorComponent},
    {path: '**', redirectTo: '/404'}

];
