import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) {}

  getCars():Observable<Car[]>{
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id:number):Observable<Car>{
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  createCar(car:Car):Observable<Car>{
    return this.http.post<Car>(this.apiUrl,car);
  }

  updateCar(car:Car){
    return this.http.put(this.apiUrl,car);
  }

  deleteCar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
