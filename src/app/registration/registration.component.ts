import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  public formReg = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    initials: new FormControl(),
    email: new FormControl()
  })

  constructor( private readonly router: Router){  }
  public openLogin(): void {
    this.router.navigateByUrl("login");
  }

  public contrRegistration(): void{
    console.log(this.formReg.value)
  }

}
