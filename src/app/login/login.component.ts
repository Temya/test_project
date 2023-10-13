import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formLog = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  })


  constructor(private readonly router: Router){
    
  }
  public openRegister(): void {
    this.router.navigateByUrl("register");
    
  }
  public openActivity(): void {
    this.router.navigateByUrl("activ");
  }

  public contrLogin(): void {
    console.log(this.formLog.value)
  }

}
