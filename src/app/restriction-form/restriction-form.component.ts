import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckCirculationService } from '../services/check-circulation.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-restriction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './restriction-form.component.html',
  styleUrls: ['./restriction-form.component.scss']
})
export class RestrictionFormComponent {
  formRestriction!: FormGroup;
  minDateTime!: string;

  constructor(
    private fb: FormBuilder,
    private checkCirculationService: CheckCirculationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formRestriction = this.fb.group({
      licensePlate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      fechaConsulta: ['', [Validators.required, this.fechaFuturaValidator]]
    });
    this.setMinDateTime();
  }

  setMinDateTime() {
    const currentDate = new Date();
    // Solo se debe establecer la fecha y hora mínima
    this.minDateTime = currentDate.toISOString().slice(0, 16);
  }

  fechaFuturaValidator(control: any) {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();
    // Asegurarse de que la fecha ingresada no sea anterior a la fecha actual
    return fechaIngresada >= fechaActual ? null : { fechaPasada: true };
  }

  consultar() {
    if (this.formRestriction.valid) {
      const licensePlate = this.formRestriction.get('licensePlate')?.value;
      const fechaConsulta = this.formRestriction.get('fechaConsulta')?.value;

      this.checkCirculationService.getCarByLicensePlate(licensePlate, fechaConsulta).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response });
        },
        error: (error) => {
          console.log(error); // Añade esto para depurar la estructura del objeto
          const errorMsg = error.error?.message || 'Ocurrió un error inesperado.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
      }
      
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, aumenta un minuto mas a la hora actual.' });
    }
  }
}
