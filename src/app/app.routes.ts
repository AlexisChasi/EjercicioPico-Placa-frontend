import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarFormComponent } from './car-form/car-form.component';
import { RestrictionFormComponent } from './restriction-form/restriction-form.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent,
        title:'Pagina de Inicio'
    },
    {
        path: 'car-form/:id',
        component:CarFormComponent,
        title:'Formulario de Autos'
    },
    {
        path: 'restriction-form',
        component:RestrictionFormComponent,
        title:'Formulario de Restriccion'
    },
    //si no existe una ruta existente se regresa a la pagina de inicio
    {
        path: '**',
        redirectTo:'',
        pathMatch:'full'

    }
];
