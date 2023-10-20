import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { BackendService } from "../services/backend.service";
import { UsersData } from "../users-data";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [HttpClient, BackendService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

  public users: UsersData[]= [];

  public formLogin = this.fb.group({
    login: this.fb.control("", Validators.required),
    password: this.fb.control("", Validators.required)
  });

  public isPasswordShown = false;

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private readonly service: BackendService, private cdr: ChangeDetectorRef){
    service.getUsers$()
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((data) => {
        this.users = data.users;
        console.log(this.users);
        cdr.detectChanges();
      });
  }

  get login(): AbstractControl | null | undefined {
    return this.formLogin.get("login");
  }

  get password(): AbstractControl | null | undefined {
    return this.formLogin.get("password");
  }  

  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }

  public openRegister(): void {
    this.router.navigateByUrl("register");
    
  }
  public openActivity(): void {
    this.router.navigateByUrl("activ");
  }

  public checkDataUser(): void{
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].firstName === this.login?.value)
      {
        if (this.users[i].password === this.password?.value)
        {
          this.router.navigateByUrl("activity");
        }
      }
      else {
        console.log("Invalid login or password");
      }
    }
  }

}
