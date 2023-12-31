import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivitiesService } from "../services/activities.service";

@Component({
  selector: "app-activity-edit",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./activity-edit.component.html",
  styleUrls: ["./activity-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityEditComponent implements OnInit{

  public formEdit?: FormGroup;

  constructor(private readonly router: Router,
    private service: ActivitiesService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute){}

  public save(): void{
    this.service.updateActivity(this.formEdit?.getRawValue());
    this.router.navigateByUrl("activity");
  }
  
  public ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id") as string);
    const activity = this.service.getActivityEdit(id);
        this.formEdit = this.fb.group({
          id: this.fb.control(activity.id, Validators.required),
          name: this.fb.control(activity.name, Validators.required),
          description: this.fb.control(activity.description, Validators.required),
          time: this.fb.control(activity.time, Validators.required),
          isDone: this.fb.control(activity.isDone, Validators.required),
        });
  }
     

}
