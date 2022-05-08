import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from "../../shared/services/appointment.service";
import {Appointment} from "../../shared/models/Appointment";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss']
})
export class ListAppointmentsComponent implements OnInit, OnDestroy {

  appointments: Appointment[] = [];

  appointmentSubscription?: Subscription;

  constructor(private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentSubscription = this.appointmentService.getAll().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  ngOnDestroy(): void {
    this.appointmentSubscription?.unsubscribe();
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.delete(appointment).then(() => {
      this.appointments = this.appointments.filter((t) => t.id !== appointment.id);
    }).catch((error) => {
      console.log(error);
    } )
  }

  updateAppointment(appointment: Appointment) {
    this.router.navigateByUrl("/edit-appointment/" + appointment.id);
  }
}
