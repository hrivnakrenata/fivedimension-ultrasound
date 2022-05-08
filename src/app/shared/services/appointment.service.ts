import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Appointment} from "../models/Appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  collectionName = "Appointments";

  constructor(private afs: AngularFirestore) { }

  create(appointment: Appointment) {
    return this.afs.collection<Appointment>(this.collectionName).add(appointment);
  }

  getAll() {
    return this.afs.collection<Appointment>(this.collectionName).valueChanges({idField: 'id'});
  }

  delete(appointment: Appointment) {
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).delete();
  }

  getOneById(id: string) {
    return this.afs.collection<Appointment>(this.collectionName).doc(id).valueChanges();
  }

  update(appointment: Appointment) {
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);
  }
}
