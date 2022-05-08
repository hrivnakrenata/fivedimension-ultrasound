import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAppointmentsRoutingModule } from './list-appointments-routing.module';
import { ListAppointmentsComponent } from './list-appointments.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AppointmentComponent} from "../../components/appointment/appointment.component";


@NgModule({
  declarations: [
    ListAppointmentsComponent,
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    ListAppointmentsRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ListAppointmentsModule { }
