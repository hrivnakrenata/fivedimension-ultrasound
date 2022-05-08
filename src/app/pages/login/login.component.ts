import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loadingSubscription?: Subscription;
  loading: boolean = false;

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value).then(_ => {
        this.router.navigateByUrl("/main");
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.loading = false;
      })
    }
  }



  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
