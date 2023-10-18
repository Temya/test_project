import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
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
  public activity: ActivityItem[] = [];
  public formCreate?: FormGroup;

  constructor(private readonly fb: FormBuilder, private service: ActivitiesService){
    
  }

  public createActivity(item: ActivityItem): void{
    this.service.createActivity(item);
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
