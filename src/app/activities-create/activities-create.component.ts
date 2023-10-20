import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivityItem } from "../activity/activity";
import { ActivitiesService } from "../services/activities.service";

@Component({
  selector: "app-activities-create",
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: "./activities-create.component.html",
  styleUrls: ["./activities-create.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesCreateComponent implements OnInit {
  public activity?: ActivityItem;
  public formCreate?: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private service: ActivitiesService){
    
  }

  public addActivity(): void{
    if (this.formCreate?.valid){
      this.activity = this.formCreate?.getRawValue();
      this.service.createActivity(this.activity as ActivityItem);
      this.router.navigateByUrl("activity");
      console.log(this.activity);
    }
  }

  public ngOnInit(): void {
    this.formCreate = this.fb.group({
      id: this.fb.control(this.service.getActivities().length + 1),
      name: this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      time: this.fb.control("", Validators.required),
      isDone: this.fb.control("", Validators.required),
    }); 
  }

}
