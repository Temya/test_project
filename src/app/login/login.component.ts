import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  
  public formLogin = this.fb.group({
    login: this.fb.control("", Validators.required),
    password: this.fb.control("", Validators.required)
  });

  public isPasswordShown = false;

  constructor(private readonly router: Router, private readonly fb: FormBuilder){
  }

  get login(): any { return this.formLogin.get("login");}

  get password(): any { return this.formLogin.get("password");}  

  
  public openRegister(): void {
    this.router.navigateByUrl("register");
    
  }
  public openActivity(): void {
    this.router.navigateByUrl("activ");
  }

  

}
