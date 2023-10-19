import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivitiesService } from "../activities.service";
import { ActivityItem } from "../activity/activity";

@Component({
  selector: "app-activities-create",
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: "./activities-create.component.html",
  styleUrls: ["./activities-create.component.scss"]
})
export class ActivitiesCreateComponent implements OnInit {
  public activity?: ActivityItem;
  public formCreate?: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private service: ActivitiesService){
    
  }

  public addActivity(): void{
    this.activity = this.formCreate?.getRawValue();
    this.service.createActivity(this.activity as ActivityItem);
    this.router.navigateByUrl("activity");
  }

  public ngOnInit(): void {
    this.formCreate = this.fb.group({
      id: this.fb.control("", Validators.required),
      name: this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      time: this.fb.control("", Validators.required),
      isDone: this.fb.control("", Validators.required),
    }); 
  }

}