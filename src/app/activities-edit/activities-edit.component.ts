import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-activities-edit",
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: "./activities-edit.component.html",
  styleUrls: ["./activities-edit.component.scss"]
})
export class ActivitiesEditComponent {

  public formEdit = this.fb.group({
    name: this.fb.control("", Validators.required),
    description: this.fb.control("", Validators.required),
    time: this.fb.control("", Validators.required),
    isDone: this.fb.control("", Validators.required),
  });

  constructor(private readonly router: Router, private readonly fb: FormBuilder){}

  get name(): any { return this.formEdit.get("login");}

  get description(): any { return this.formEdit.get("password");}
  
  get time(): any { return this.formEdit.get("login");}

  get isDone(): any { return this.formEdit.get("password");} 

}
