import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  public formLogin?: FormGroup


  constructor(private readonly router: Router, private readonly fb: FormBuilder){
    this.formLogin = this.fb.group({
      login: this.fb.control(""),
      password: this.fb.control("")
    })
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

}
