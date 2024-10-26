import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cars: Car[]=[];
  isDeleteInProgress:boolean=false;
  constructor(private  carService:CarService, private messageService:MessageService) {  }
  ngOnInit():void{
    this.getAllCars();
  }
  getAllCars(){
    this.carService.getCars().subscribe((data)=>{
      this.cars=data;
  });
}

deleteCar(id:number) {
  
  this.isDeleteInProgress=true;
  this.carService.deleteCar(id).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Auto eliminado con exito'
      });
      this.isDeleteInProgress=false;
      this.getAllCars();
     
    },
    error: () => {
      this.isDeleteInProgress=false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el Auto'
      });
    }
  })
}
}


