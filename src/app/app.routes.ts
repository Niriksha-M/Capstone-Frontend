import { Routes } from '@angular/router';
import { BikeParkingComponent } from './bike-parking/bike-parking.component';
import { CarParkingComponent } from './car-parking/car-parking.component';
import { OtherVehicleComponent } from './other-vehicle/other-vehicle.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventRequestComponent } from './event-request/event-request.component';
import { CreateEventRequestComponent } from './create-event-request/create-event-request.component';
import { ParcipateInEventComponent } from './parcipate-in-event/parcipate-in-event.component';
import { WorkspaceComponent } from './workspace/workspace.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'home-page', component: HomePageComponent},
  {path:'event-request', component: EventRequestComponent},
  { path:'workspace', component: WorkspaceComponent},
  { path:'create-event-request', component: CreateEventRequestComponent},
  { path:'parcipate-in-event', component: ParcipateInEventComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'select-vehicle', component: SelectVehicleComponent },
  { path: 'bike-parking', component: BikeParkingComponent },
  { path: 'car-parking', component: CarParkingComponent },
  { path: 'other-vehicle', component: OtherVehicleComponent },
];
