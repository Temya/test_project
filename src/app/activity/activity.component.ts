import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ActivitiesEditComponent } from "../activities-edit/activities-edit.component";
import { ActivitiesService } from "../activities.service";
import { ActivityItem } from "./activity";


@Component({
  selector: "app-activity",
  standalone: true,
  imports: [CommonModule, ActivitiesEditComponent],
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})

export class ActivityComponent {

  // @Output() public eventEmitter: EventEmitter<ActivityItem> = new EventEmitter<ActivityItem>();
  // @Input() public tmp?: any;
  public activities: ActivityItem[] = [];  

  public selectActivity?: ActivityItem;
  public mode: "DEFAULT" | "EDIT" = "DEFAULT";


  constructor(private readonly router: Router, private service: ActivitiesService){
    this.activities = this.service.getActivities();    
  }
  
  public done(): void{
    if (this.mode === "DEFAULT"){
      this.mode = "EDIT";
    }
    else {
      this.mode = "DEFAULT";
    }
  }
  
  public delete(activity: ActivityItem): void {
    this.activities = this.activities.filter((n) => n.id !== activity.id);
  }

  public create(): void{
    this.router.navigateByUrl("create");
  }
  
  public edit(activity: ActivityItem): void {
    if (this.mode === "DEFAULT"){
      this.mode = "EDIT";
    }
    else {
      this.mode = "DEFAULT";
    }
    this.selectActivity = activity;
  }

  public updateActivity(event: ActivityItem): void{
    this.activities = this.activities.map((activity) => {
      if (activity.id === event.id) return event;
      return activity;
    });
    if (this.mode === "DEFAULT"){
      this.mode = "EDIT";
    }
    else {
      this.mode = "DEFAULT";
    }
  }

}
