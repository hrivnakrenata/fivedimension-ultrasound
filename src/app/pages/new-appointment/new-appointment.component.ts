import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentService} from "../../shared/services/appointment.service";
import {Appointment} from "../../shared/models/Appointment";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {

  appointmentForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', [Validators.required])
  })

  id?: string;
  isAddMode?: boolean;

  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.appointmentService.getOneById(this.id!).pipe(first()).subscribe(appointment => {
        if (appointment !== undefined) {
          this.appointmentForm.get("email")?.setValue(appointment.email);
          this.appointmentForm.get("date")?.setValue(appointment.date)
        }
      });
    }
  }

  async onSubmit() {
    if (this.appointmentForm.valid) {
      this.loading = true;
      const appointment : Appointment = {
        email: this.appointmentForm.get("email")?.value,
        date: this.appointmentForm.get("date")?.value
      };
      if (this.isAddMode) {
        this.appointmentService.create(appointment).then(_ => {
          this.router.navigateByUrl("/main");
          this.loading = false;
        }).catch(error => {
          console.log(error);
          this.loading = false;
        })
      } else {
        appointment.id = this.id;
        this.appointmentService.update(appointment).then(_ => {
          this.router.navigateByUrl("/main");
          this.loading = false;
        }).catch(error => {
          console.log(error);
          this.loading = false;
        })
      }
    }
  }
}
