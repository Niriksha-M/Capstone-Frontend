import { Routes } from '@angular/router';
import { BikeParkingComponent } from './bike-parking/bike-parking.component';
import { CarParkingComponent } from './car-parking/car-parking.component';
import { OtherVehicleComponent } from './other-vehicle/other-vehicle.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'select-vehicle', component: SelectVehicleComponent },
  { path: 'bike-parking', component: BikeParkingComponent },
  { path: 'car-parking', component: CarParkingComponent },
  { path: 'other-vehicle', component: OtherVehicleComponent },
];
