import { Injectable } from "@angular/core";
import { ActivityItem } from "./activity/activity";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  public activities: ActivityItem[] = [];

  constructor(){ 
    this.loadData();
  }

  public createActivity(activity: ActivityItem): void{
    this.activities.push(activity);
  }

  public loadData(): void{
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
  public getActivities(): ActivityItem[]{
    return this.activities;
  }

  
}