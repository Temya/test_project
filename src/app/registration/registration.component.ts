import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  public formReg?: FormGroup

  constructor( private readonly router: Router, private readonly fb: FormBuilder){ 
    this.formReg = this.fb.group({
    login: this.fb.control(""),
    password: this.fb.control(""),
    confirmPassword: this.fb.control(""),
    initials: this.fb.control(""),
    email: this.fb.control("")
    })
   }
  public openLogin(): void {
    this.router.navigateByUrl("login");
  }

  public contrRegistration(): void{
    console.log(this.formReg?.value)
  }

}
