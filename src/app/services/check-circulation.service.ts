import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CheckCirculationService {

  private apiUrl = environment.checkCirculationUrl;

  constructor(private http:HttpClient) { }

 
  getCarByLicensePlate(licensePlate: string, fechaConsulta: string): Observable<string> {
    const url = `${this.apiUrl}?licensePlate=${licensePlate}&fechaConsulta=${fechaConsulta}`;
    return this.http.get(url, { responseType: 'text' }); // Cambia a 'text'
}

}
