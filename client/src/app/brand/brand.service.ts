import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Brand } from '../types/brand';
import { Car } from '../types/car';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAllBrands():Observable<Brand[]>{
    return this.http
    .get<Brand[]>('/api/brands')
    .pipe(map(response => response));;
  }

  getAllCarsWithCurrentBrand(id: string):Observable<Car[]>{
    return this.http.get<Car[]>(`/api/brands/${id}`)
    .pipe(map(response => response));
  }
 
}
