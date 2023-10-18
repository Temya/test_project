import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivityItem } from "../activity/activity";

@Component({
  selector: "app-activities-edit",
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: "./activities-edit.component.html",
  styleUrls: ["./activities-edit.component.scss"]
})
export class ActivitiesEditComponent implements OnInit {

  @Output() public eventEmitter: EventEmitter<ActivityItem> = new EventEmitter<ActivityItem>();
  @Input() public activity?: ActivityItem; 

  
  
  public formEdit?: FormGroup;



  constructor(private readonly router: Router, private readonly fb: FormBuilder){}
  
  public ngOnInit(): void {
    this.formEdit = this.fb.group({
      id: this.fb.control(this.activity?.id, Validators.required),
      name: this.fb.control(this.activity?.name, Validators.required),
      description: this.fb.control(this.activity?.description, Validators.required),
      time: this.fb.control(this.activity?.time, Validators.required),
      isDone: this.fb.control(this.activity?.isDone, Validators.required),
    });
  }

  public save(): void {
    this.activity = this.formEdit?.getRawValue();
    this.eventEmitter.emit(this.activity);
  }


}
