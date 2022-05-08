import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    })
  });

  constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.get("email")?.value, this.signUpForm.get("password")?.value).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get("email")?.value,
          name: {
            firstname: this.signUpForm.get("name.firstname")?.value,
            lastname: this.signUpForm.get("name.lastname")?.value
          }
        };
        this.userService.create(user).then(_ => {
          this.router.navigateByUrl("/main");
        }).catch(error => {
          console.log(error);
        })
      }).catch(error => {
        console.error(error);
      })
    }
  }

  goBack() {
    this.location.back();
  }
}
