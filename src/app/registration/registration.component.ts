import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  public formRegistr?: FormGroup

  constructor( private readonly router: Router, private readonly fb: FormBuilder){ 
    this.formRegistr = this.fb.group({
      login: this.fb.control("", [Validators.required, Validators.minLength(3), Validators.maxLength(24), Validators.pattern('[a-zA-Z ]*')]),
      password: this.fb.control("", Validators.required),
      confirmPassword: this.fb.control(""),
      initials: this.fb.control(""),
      email: this.fb.control("", Validators.required)
    })
   }
  public openLogin(): void {
    this.router.navigateByUrl("login");
  }

  public contrRegistration(): void{
    console.log(this.formRegistr?.value)
  }

  get login() { return this.formRegistr?.get('login');}

  get password() { return this.formRegistr?.get('password');}

  get confirmPassword() { return this.formRegistr?.get('confirmPassword');}

  get email() { return this.formRegistr?.get('email');}


}
