import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ActivitiesEditComponent } from "../activities-edit/activities-edit.component";
import { ActivityItem } from "./activity";


@Component({
  selector: "app-activity",
  standalone: true,
  imports: [CommonModule, ActivitiesEditComponent],
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})

export class ActivityComponent {

  @Output() public eventEmitter: EventEmitter<ActivityItem> = new EventEmitter<ActivityItem>();
  @Input() public tmp?: any;
  public activities: ActivityItem[] = [];  

  public status = true;

  constructor(private readonly router: Router){

    for (let i = 0; i < 10; i++){
      this.activities.push({
        id: i,
        name: "Bob",
        description: "Blablablablabal",
        time: "10.11.2023",
        isDone: true
      });
    }    
  }
  
  
  public delete(activity: any): void {
    this.activities = this.activities.filter((n) => n.id !== activity.id);
    // this.eventEmitter.emit();
  }

  public create(): void{
    this.activities.push({
        id: this.activities.length + 1,
        name: "Edit",
        description: "Edit",
        time: "Edit",
        isDone: false
    });

  }
  
  public edit(): void {
    this.status = !this.status;
  }

}
