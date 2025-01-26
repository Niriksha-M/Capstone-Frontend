import { Routes } from '@angular/router';
import { BikeParkingComponent } from './parking/bike-parking/bike-parking.component';
import { CarParkingComponent } from './parking/car-parking/car-parking.component';
import { OtherVehicleComponent } from './parking/other-vehicle/other-vehicle.component';
import { SelectVehicleComponent } from './parking/select-vehicle/select-vehicle.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'select-vehicle', pathMatch: 'full' },
  { path: 'select-vehicle', component: SelectVehicleComponent },
  { path: 'bike-parking', component: BikeParkingComponent },
  { path: 'car-parking', component: CarParkingComponent },
  { path: 'other-vehicle', component: OtherVehicleComponent },
];
