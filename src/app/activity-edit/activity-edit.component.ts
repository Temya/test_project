import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivitiesService } from "../activities.service";

@Component({
  selector: "app-activity-edit",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./activity-edit.component.html",
  styleUrls: ["./activity-edit.component.scss"]
})
export class ActivityEditComponent implements OnInit{

  public formEdit?: FormGroup;

  constructor(private readonly router: Router,private service: ActivitiesService, private readonly fb: FormBuilder){}

  public Save(): void{
    this.service.updateActivity(this.formEdit?.getRawValue());
    this.router.navigateByUrl("activity");
  }
  
  public ngOnInit(): void {
        this.formEdit = this.fb.group({
          id: this.fb.control(this.service.getActivityEdit().id, Validators.required),
          name: this.fb.control(this.service.getActivityEdit().name, Validators.required),
          description: this.fb.control(this.service.getActivityEdit().description, Validators.required),
          time: this.fb.control(this.service.getActivityEdit().time, Validators.required),
          isDone: this.fb.control(this.service.getActivityEdit().isDone, Validators.required),
        });
      }
     

}



// @Component({
//   selector: "app-activities-edit",
//   standalone: true,
//   imports: [CommonModule,
//     ReactiveFormsModule],
//   templateUrl: "./activities-edit.component.html",
//   styleUrls: ["./activities-edit.component.scss"]
// })
// export class ActivitiesEditComponent implements OnInit {


  
  




//   constructor(private readonly router: Router, ){}
  
//   

//   public save(): void {
//     this.activity = this.formEdit?.getRawValue();
//     this.eventEmitter.emit(this.activity);
//   }
