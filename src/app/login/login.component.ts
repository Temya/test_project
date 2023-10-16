import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formLogin = this.fb.group({
    login: this.fb.control("", Validators.required),
    password: this.fb.control("", Validators.required)
  })

  public isPasswordShown = false;

  // public formLogin?: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder){
  }
  public openRegister(): void {
    this.router.navigateByUrl("register");
    
  }
  public openActivity(): void {
    this.router.navigateByUrl("activ");
  }

  public testLogin(): void {
    this.formLogin?.patchValue({ login: 'Artem', password: '123123123'}),
    console.log(this.formLogin?.value)
  }

  get login() { return this.formLogin?.get('login');}

  get password() { return this.formLogin?.get('password');}  


}
