import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { ButtonModule } from 'primeng/button';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule

  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss'
})
export class CarFormComponent {

  formCar!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formCar = this.fb.group({
      id: [null],
      licensePlate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      color: ['', Validators.required],
      model: ['', Validators.required],
      chassis: ['', Validators.required],
      owner: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true
      this.getCarById(+id!)
    }

  }
  getCarById(id: number) {
    this.carService.getCarById(id).subscribe({
      next: (foundCar) => {
        this.formCar.patchValue(foundCar);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/')
      }
    });
    
  }

  createCar() {
    if (this.formCar.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe rellenar todos los campos del formulario'
      });
      return
    }
    this.isSaveInProgress=true;
    this.carService.createCar(this.formCar.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Auto guardado con exito'
        });
        this.isSaveInProgress=false;
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.isSaveInProgress=false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Debe rellenar todos los campos del formulario'
        });
      }
    })
  }

  updateCar() {
    if (this.formCar.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe rellenar todos los campos del formulario'
      });
      return
    }
    this.isSaveInProgress=true;
    this.carService.updateCar(this.formCar.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Auto actualizado con exito'
        });
        this.isSaveInProgress=false;
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.isSaveInProgress=false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Debe rellenar todos los campos del formulario'
        });
      }
    })
  }
}