import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Appointment} from "../../shared/models/Appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  @Input() appointment?: Appointment;
  @Output() onDeleteAppointment: EventEmitter<Appointment> = new EventEmitter();
  @Output() onUpdateAppointment: EventEmitter<Appointment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(appointment: Appointment) {
    this.onDeleteAppointment.emit(appointment);
  }

  onModify(appointment: Appointment) {
    this.onUpdateAppointment.emit(appointment);
  }
}
