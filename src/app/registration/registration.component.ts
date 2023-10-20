import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  standalone: true,
  imports: [CommonModule,
  ReactiveFormsModule],
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {

  public formRegistr?: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder){ 
    this.formRegistr = this.fb.group({
      login: this.fb.control("", [Validators.required, Validators.minLength(3), Validators.maxLength(24), Validators.pattern("[a-zA-Z ]*")]),
      password: this.fb.control("", Validators.required),
      confirmPassword: this.fb.control(""),
      initials: this.fb.control(""),
      email: this.fb.control("", Validators.required)
    });
   }

  get login(): AbstractControl | null | undefined {
    return this.formRegistr?.get("login");
  }

  get password(): AbstractControl | null | undefined {
    return this.formRegistr?.get("password");
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.formRegistr?.get("confirmPassword");
  }

  get email(): AbstractControl | null | undefined {
    return this.formRegistr?.get("email");
  }

  public openLogin(): void {
    this.router.navigateByUrl("login");
  }

  public contrRegistration(): void{
    console.log(this.formRegistr?.value);
  }

  


}
