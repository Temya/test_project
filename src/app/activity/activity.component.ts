import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivitiesService } from "../activities.service";
import { ActivityItem } from "./activity";


@Component({
  selector: "app-activity",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})

export class ActivityComponent {

  // @Output() public eventEmitter: EventEmitter<ActivityItem> = new EventEmitter<ActivityItem>();
  // @Input() public tmp?: any;
  public activities: ActivityItem[] = [];  

  public selectActivity?: ActivityItem;


  constructor(private readonly router: Router, private service: ActivitiesService){
    this.activities = this.service.getActivities();    
  }
    
  public delete(activity: ActivityItem): void {
    this.service.activityDelete(activity);
    this.activities = this.service.getActivities();
  }

  public create(): void{
    this.router.navigateByUrl("create");
  }
  
  public edit(activity: ActivityItem): void {
    this.router.navigateByUrl(`edit/${activity.id}`);
    this.service.activityItem(activity);
  }

}
